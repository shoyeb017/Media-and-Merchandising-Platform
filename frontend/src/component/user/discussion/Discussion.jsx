// src/components/DiscussionPage.jsx
import React, { useEffect, useState } from 'react';
import DiscussionCard from './DiscussionCard';
import ReplyCard from './ReplyCard';
import './Discussion.css';

import dis from './dis.jpeg';

const Discussion = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [view, setView] = useState('all'); // 'all' or 'my'
  const [replyText, setReplyText] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [replies, setReplies] = useState([]);

  const fetchDiscussions = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        setDiscussions(data);
      } else {
        alert('Failed to fetch discussions');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchDiscussions('http://localhost:5000/discussions');
  }, []);

  useEffect(() => {
    const fetchReplies = async () => {
      if (!selectedDiscussion) return;
      try {
        const response = await fetch(`http://localhost:5000/discussions/replies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ discussion_id: selectedDiscussion.DIS_ID }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setReplies(data);
        } else {
          alert('Failed to fetch replies');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchReplies();
  }, [selectedDiscussion]);

  const handleAddReply = async () => {
    if (!selectedDiscussion || !replyText) return;

    try {
      const response = await fetch('http://localhost:5000/discussions/add/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: localStorage.getItem('user_id'),
          discussion_id: selectedDiscussion.DIS_ID,
          description: replyText,
          replyCount: selectedDiscussion.REPLY_COUNT,
        }),
      });

      if (response.status === 201) {
        // Fetch the updated replies after adding a new reply
        const updatedRepliesResponse = await fetch(`http://localhost:5000/discussions/replies`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ discussion_id: selectedDiscussion.DIS_ID }),
        });

        if (updatedRepliesResponse.status === 200) {
          const updatedReplies = await updatedRepliesResponse.json();
          setReplies(updatedReplies);
          setReplyText(''); // Reset reply text after successful reply
        } else {
          alert('Failed to fetch updated replies');
        }

        // Update replyCount in discussioncard
        const updatedDiscussion = { ...selectedDiscussion, REPLY_COUNT: selectedDiscussion.REPLY_COUNT + 1 };
        setSelectedDiscussion(updatedDiscussion);

        // Update the discussions array with the updated discussion
        const updatedDiscussions = discussions.map(discussion =>
          discussion.DIS_ID === updatedDiscussion.DIS_ID ? updatedDiscussion : discussion
        );
        setDiscussions(updatedDiscussions);
      } else {
        alert('Failed to add reply');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleViewChange = async (selectedView) => {
    setView(selectedView);
    if (selectedView === 'my') {
      try {
        const response = await fetch('http://localhost:5000/discussions/my', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: localStorage.getItem('user_id') }),
        });
        if (response.status === 200) {
          const data = await response.json();
          setDiscussions(data);
        } else {
          alert('Failed to fetch discussions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      fetchDiscussions('http://localhost:5000/discussions');
    }
  };
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="discussion-page">
      <div className="discussion-list">
      <div className="discussion-list-header">
      <button
          className={`list-button ${view === 'my' ? 'active' : ''}`}
          onClick={() =>  handleViewChange('my')}
        >
          MY DISCUSSION
        </button>
        <button
          className={`list-button ${view === 'all' ? 'active' : ''}`}
          onClick={() => handleViewChange('all')}
        >
          ALL DISCUSSION
        </button>
        </div>
        <div className="discussion-cards">
          {discussions.map(discussion => (
            <DiscussionCard
              key={discussion.DIS_ID}
              title={discussion.TITLE}
              topic={discussion.TOPIC}
              description={discussion.DESCRIPTION}
              replyCount={discussion.REPLY_COUNT}
              date={discussion.DIS_DATE}
              poster={discussion.POSTER}
              onClick={() => setSelectedDiscussion(discussion)}
            />
          ))}
        </div>
      </div>
      <div className="discussion-details">
        {selectedDiscussion ? (
          <div>
            <div className="discussion-details-header">
              <div className="discussion-details-header-inner1">
                <img src={dis} alt="poster" className="discussion-details-header-poster1" />
                <img src={selectedDiscussion.POSTER} alt="poster" className="discussion-details-header-poster2" />
              </div>
              <div className="discussion-details-header-inner2">
              <h3 className="discussion-details-topic">{selectedDiscussion.TOPIC}</h3>
                <p className="discussion-details-title">{selectedDiscussion.TITLE}</p>
                <p className="discussion-details-desc">{selectedDiscussion.DESCRIPTION}</p>
                <p className="discussion-details-date">{formatDate(selectedDiscussion.DIS_DATE)}</p>
              </div>
            </div>
            <p className="discussion-details-reply-count">{replies.length} replies</p>
            <div className="discussion-details-replies-section">
            <div className="replies">
              {replies.map(reply => (
                <ReplyCard
                  key={reply.DIS_ID}
                  name={reply.NAME}
                  text={reply.DESCRIPTION}
                  reply={reply.REPLY_COUNT}
                />
              ))}
            </div>
            <div className="reply-input">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
              />
              <button onClick={handleAddReply}>Reply</button>
            </div>
            </div>
          </div>
        ) : (
          <p style={{ color: 'white' }}>Select a discussion to see details.</p>
        )}
      </div>
    </div>
  );
};

export default Discussion;
