document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentsContainer = document.getElementById("comments-container");

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText) {
            addComment(commentText);
            commentInput.value = "";
        }
    });

    function addComment(text, isReply = false) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        const content = document.createElement("p");
        content.textContent = text;

        const replyButton = document.createElement("span");
        replyButton.classList.add("reply-btn");
        replyButton.textContent = "Reply";
        replyButton.addEventListener("click", () => {
            toggleReplyForm(commentDiv);
        });

        commentDiv.appendChild(content);
        commentDiv.appendChild(replyButton);

        if (!isReply) {
            commentsContainer.appendChild(commentDiv);
        } else {
            const repliesContainer = document.createElement("div");
            repliesContainer.classList.add("replies");
            repliesContainer.appendChild(commentDiv);
            return repliesContainer;
        }

        addReplyForm(commentDiv);
    }

    function addReplyForm(commentDiv) {
        const replyForm = document.createElement("form");
        replyForm.classList.add("reply-form");

        const replyInput = document.createElement("textarea");
        replyInput.placeholder = "Write a reply...";
        replyInput.required = true;

        const replyButton = document.createElement("button");
        replyButton.type = "submit";
        replyButton.textContent = "Reply";

        replyForm.appendChild(replyInput);
        replyForm.appendChild(replyButton);
        replyForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const replyText = replyInput.value.trim();
            if (replyText) {
                const replyContainer = addComment(replyText, true);
                commentDiv.querySelector(".replies")?.appendChild(replyContainer);
                replyInput.value = "";
                replyForm.style.display = "none";
            }
        });

        commentDiv.appendChild(replyForm);
    }

    function toggleReplyForm(commentDiv) {
        const replyForm = commentDiv.querySelector(".reply-form");
        replyForm.style.display = replyForm.style.display === "none" || !replyForm.style.display ? "block" : "none";
    }
});
