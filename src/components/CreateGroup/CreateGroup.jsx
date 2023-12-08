import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createGroup } from "../../utilities/service/api";
import { useParams, useNavigate } from "react-router-dom";

const GroupCreation = () => {
  const { flashcardSetId } = useParams();
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState("");
  const [groupLink, setGroupLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [message, setMessage] = useState("");
  const [groupCreated, setGroupCreated] = useState(false);

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    // Allow empty email input or validate if not empty
    const isValidEmails =
      groupMembers.trim() === "" ||
      groupMembers
        .split(",")
        .map((email) => email.trim())
        .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

    if (!isValidEmails) {
      setMessage("Invalid email format. Please check your emails.");
      return;
    }

    try {
      const groupData = {
        name: groupName,
        members:
          groupMembers.trim() === ""
            ? []
            : groupMembers.split(",").map((member) => member.trim()),
        flashcardSet: flashcardSetId,
      };

      const { link } = await createGroup(flashcardSetId, groupData);

      setGroupLink(link);
      setIsCopied(false);
      setMessage("Group created successfully! Share the link.");
      setGroupCreated(true);
    } catch (error) {
      console.error("Error creating group:", error.response);
      setMessage("Error creating group. Please try again.");
    }
  };

  return (
    <div className="group_container">
      <h1 className="title">Share your Set with a Group</h1>
      <h3 className="description">
        Share the link to your Set with selected friends.
      </h3>

      <div className="group-container">
        {groupCreated ? (
          <div>
            {groupLink && (
              <div className="link-field">
                <CopyToClipboard
                  text={groupLink}
                  onCopy={() => setIsCopied(true)}
                >
                  <button className="copy">
                    <FaCopy /> Copy Link
                  </button>
                </CopyToClipboard>
                {isCopied && <div className="message">Link Copied!</div>}
              </div>
            )}
            <div></div>
          </div>
        ) : (
          <div>
            <form className="group_form" onSubmit={handleCreateGroup}>
              <div className="group_name">
                <label htmlFor="name">
                  Group Name:
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="members">
                <label htmlFor="members">
                  Members (optional):
                  <textarea
                    name="members"
                    id="members"
                    placeholder="Enter emails separated by comma"
                    value={groupMembers}
                    onChange={(e) => setGroupMembers(e.target.value)}
                  />
                </label>
              </div>
              <div className="group_button">
                <button type="submit">Create Group</button>
              </div>
            </form>
          </div>
        )}
      </div>
      {message && <div className="message">{message}</div>}
      <div className="back-box">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back to Edit Set
        </button>
      </div>
    </div>
  );
};

export default GroupCreation;
