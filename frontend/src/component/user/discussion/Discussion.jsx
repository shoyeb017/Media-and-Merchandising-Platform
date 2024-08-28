// src/components/DiscussionPage.jsx
import React, { useEffect, useState } from 'react';
import DiscussionCard from './DiscussionCard';
import ReplyCard from './ReplyCard';
import './Discussion.css';

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

  const handleViewChange = (view) => {
    setView(view);
    if (view === 'my') {
      fetchDiscussions(`http://localhost:5000/discussions/my?user_id=${localStorage.getItem('user_id')}`);
    } else {
      fetchDiscussions('http://localhost:5000/discussions');
    }
  };

  return (
    <div className="discussion-page">
      <div className="discussion-list">
        <div className="discussion-list-header">
          <button onClick={() => handleViewChange('my')}>My Discussions</button>
          <button onClick={() => handleViewChange('all')}>All Discussions</button>
        </div>
        <div className="discussion-cards">
          {discussions.map(discussion => (
            <DiscussionCard
              key={discussion.DIS_ID}
              title={discussion.TITLE}
              topic={discussion.TOPIC}
              description={discussion.DESCRIPTION}
              replyCount={discussion.REPLY_COUNT}
              onClick={() => setSelectedDiscussion(discussion)}
            />
          ))}
        </div>
      </div>
      <div className="discussion-details">
        {selectedDiscussion ? (
          <>
            <div className="discussion-details-header">
              <p className="discussion-details-title">{selectedDiscussion.TITLE}</p>
              <h3 className="discussion-details-topic">{selectedDiscussion.TOPIC}</h3>
              <p className="discussion-details-desc">{selectedDiscussion.DESCRIPTION}</p>
            </div>
            <p className="discussion-details-reply-count">{replies.length} replies</p>
            <div className="replies">
              {replies.map(reply => (
                <ReplyCard
                  key={reply.DIS_ID}
                  name={reply.NAME}
                  text={reply.DESCRIPTION}
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
          </>
        ) : (
          <p style={{ color: 'white' }}>Select a discussion to see details.</p>
        )}
      </div>
    </div>
  );
};

export default Discussion;
