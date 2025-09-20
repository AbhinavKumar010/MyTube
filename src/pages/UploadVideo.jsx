import { useState } from "react";
import "./UploadVideo.css";

export default function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);

    const url = URL.createObjectURL(file);
    setThumbnailPreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) return alert("Please select a video file");

    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("uploader", "USER_ID_HERE"); // replace with real user id
    formData.append("video", videoFile); // field name 'video'

    try {
      const res = await fetch("http://localhost:5000/api/videos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json(); // JSON response from server
      alert("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnailPreview(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          required
        />

        {thumbnailPreview && (
          <div style={{ margin: "0.5rem 0" }}>
            <p>Thumbnail Preview:</p>
            <video
              src={thumbnailPreview}
              width="100%"
              height="200"
              controls
            ></video>
          </div>
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}
