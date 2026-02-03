import {
  handleSignInWithGoogle,
  supabase,
  getComments,
  createComment,
  handleSignOut,
} from "./supabase.ts";

(window as any).handleSignInWithGoogle = handleSignInWithGoogle;
(window as any).handleSignOut = handleSignOut;
(window as any).createComment = async (slug: string, content: string) => {
  if (!content.trim()) {
    alert("Empty comment provided.");
    return;
  }
  try {
    await createComment(slug, content);
  } catch (error) {
    console.error("Failed to post comment:", error);
    alert("Failed to post comment");
  }
};

export async function initComments() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const signinBtn = document.querySelector(".google-signin") as HTMLElement;
  const signoutBtn = document.querySelector(".signout-btn") as HTMLElement;
  const commentBox = document.querySelector(".comment-box") as HTMLElement;

  if (session) {
    signinBtn.style.display = "none";
    signoutBtn.style.display = "block";
    commentBox.removeAttribute("disabled");
    commentBox.setAttribute("placeholder", "Write your comment here...");
  } else {
    signinBtn.style.display = "block";
    signoutBtn.style.display = "none";
    commentBox.setAttribute("disabled", "true");
    commentBox.setAttribute("placeholder", "Sign in to add a comment.");
  }

  supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_IN" || event === "SIGNED_OUT") location.reload();
  });

  const comments = await getComments(
    window.location.pathname.split("/").filter(Boolean).join("/"),
  );
  const commentsList = document.querySelector(".comments-list");

  comments.forEach((comment) => {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.innerHTML = `
      <div class="avatar">
        <img src="${comment.profiles?.avatar_url}" alt="${comment.profiles?.name}'s avatar" referrerpolicy="no-referrer" />
      </div>
      <div class="comment-content">
        <div class="comment-author">${comment.profiles?.name}</div>
        <div class="comment-text">${comment.content}</div>
      </div>
    `;
    commentsList?.appendChild(commentDiv);
  });
}
