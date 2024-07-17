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

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch('http://localhost:5000/discussions', {
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
    fetchDiscussions();
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

  const handleAddReply = () => {
    if (!selectedDiscussion || !replyText) return;

    const newReply = {
      DIS_ID: new Date().getTime(),
      NAME: localStorage.getItem('username'), // Replace with actual user data
      DESCRIPTION: replyText,
    };

    setReplies([...replies, newReply]);
    setReplyText('');
  };

  return (
    <div className="discussion-page">
      <div className="discussion-list">
        <div className="discussion-list-header">
          <button onClick={() => setView('my')}>My Discussions</button>
          <button onClick={() => setView('all')}>All Discussions</button>
        </div>
        <div className="discussion-cards">
          {discussions
            .filter(discussion => view === 'all' || discussion.isMine)
            .map(discussion => (
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
























// // src/components/DiscussionPage.jsx
// import React, { useEffect, useState } from 'react';
// import DiscussionCard from './DiscussionCard';
// import ReplyCard from './ReplyCard';
// import './Discussion.css';

// const Discussion = () => {
//   const [selectedDiscussion, setSelectedDiscussion] = useEffect(null);
//   const [view, setView] = useState('all'); // 'all' or 'my'
//   const [replyText, setReplyText] = useState('');
//   const [discussions, setDiscussions] = useEffect([]);
    


//   useEffect(() => {
//     const fetchDiscussions = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/discussions', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         if (response.status === 200) {
//           const data = await response.json();
//           setDiscussions(data);
//         } else {
//           alert('Failed to fetch discussions');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     } 
//     fetchDiscussions();
//   }
//   , []);
//     // )
//     // { id: 1, 
//     //   title: 'Movie 1 Discussion 1 Discussion 1 Discussion 1 Discussion 1 Discussion 1 Discussion 1 Discussion 1', 
//     //   topic: 'Discussion 1 Discussion 1 Discussion 1 Discussion 1 Discussion 1 Discussion 1 Discussion 1', 
//     //   description: 'This is a sample discussion 1 This is a sample discussion 1This is a sample discussion 1This is a sample discussion 1This is a sample discussion 1This is a sample discussion 1This is a sample discussion 1This is a sample discussion 1This is a sample discussion 1This is a sample discussion 1This is a sample discussion 1', 
//     //   replyCount: 5,
//     //   isMine: true
//     //     ,replies: [{ id: 1, name: 'User 1', text: 'This is a reply to discussion 1 This is a reply to discussion 1  This is a reply to discussion 1  This is a reply to discussion 1  This is a reply to discussion 1  This is a reply to discussion 1 ' }
//     //               ,{ id: 2, name: 'User 2', text: 'This is a reply to discussion 1' }
//     //               ,{ id: 2, name: 'User 2', text: 'This is a reply to discussion 1' }
//     //               ,{ id: 2, name: 'User 2', text: 'This is a reply to discussion 1' }
//     //               ,{ id: 2, name: 'User 2', text: 'This is a reply to discussion 1' }
//     //               ,{ id: 2, name: 'User 2', text: 'This is a reply to discussion 1' }
//     //               ,{ id: 2, name: 'User 2', text: 'This is a reply to discussion 1' }
//     //               ,{ id: 2, name: 'User 2', text: 'This is a reply to discussion 1' }
//     //               ,{ id: 2, name: 'User 2', text: 'This is a reply to discussion 1' }
//     //               ] 

//     // }
//   // ]);

//   const handleAddReply = () => {
//     if (!selectedDiscussion || !replyText) return;

//     const newReply = {
//       id: new Date().getTime(),
//       name: 'Current User', // Replace with actual user data
//       text: replyText,
//     };

//     const updatedDiscussions = discussions.map(discussion =>
//       discussion.id === selectedDiscussion.id
//         ? {
//             ...discussion,
//             replies: [...discussion.replies, newReply],
//             replyCount: discussion.replyCount + 1,
//           }
//         : discussion
//     );

//     setDiscussions(updatedDiscussions);
//     setSelectedDiscussion(updatedDiscussions.find(d => d.id === selectedDiscussion.id));
//     setReplyText('');
//   };

//   return (
//     <div className="discussion-page">
//       <div className="discussion-list">
//         <div className="discussion-list-header">
//           <button onClick={() => setView('my')}>My Discussions</button>
//           <button onClick={() => setView('all')}>All Discussions</button>
//         </div>
//         <div className="discussion-cards">
//           {discussions
//             .filter(discussion => view === 'all' || discussion.isMine)
//             .map(discussion => (
//               <DiscussionCard
//                 key={discussion.id}
//                 title={discussion.title}
//                 topic={discussion.topic}
//                 description={discussion.description}
//                 replyCount={discussion.replyCount}
//                 onClick={() => setSelectedDiscussion(discussion)}
//               />
//           ))}
//         </div>
//       </div>
//       <div className="discussion-details">
//         {selectedDiscussion ? (
//           <>
//         <div className="discussion-details-header">
//             <p className="discussion-details-title">{selectedDiscussion.title}</p>
//             <h3 className="discussion-details-topic">{selectedDiscussion.topic}</h3>
//             <p className="discussion-details-desc">{selectedDiscussion.description}</p>
//         </div>
//         <p className="discussion-details-reply-count" >{selectedDiscussion.replyCount} replies</p>
//             <div className="replies">
//               {selectedDiscussion.replies.map(reply => (
//                 <ReplyCard
//                   key={reply.id}
//                   name={reply.name}
//                   text={reply.text}
//                 />
//               ))}
//             </div>
//             <div className="reply-input">
//               <input
//                 type="text"
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 placeholder="Write a reply..."
//               />
//               <button onClick={handleAddReply}>Reply</button>
//             </div>
//           </>
//         ) : (
//           <p style={{ color: 'white' }}>Select a discussion to see details.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Discussion;
