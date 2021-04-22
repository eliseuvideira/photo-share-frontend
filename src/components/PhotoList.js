export const PhotoList = ({ photos }) => (
  <table>
    <thead>
      <tr>
        <td>Name</td>
        <td>Category</td>
        <td>Url</td>
        <td>Posted By</td>
      </tr>
    </thead>
    <tbody>
      {photos.map((photo) => (
        <tr key={photo.photoId}>
          <td>{photo.name}</td>
          <td>{photo.category}</td>
          <td>{photo.url}</td>
          <td>{photo.postedBy.userId}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
