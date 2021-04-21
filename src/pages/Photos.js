import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Page } from "../components/Page";

const CREATE_PHOTO = gql`
  mutation($name: String!, $category: PhotoCategory!) {
    createPhoto(input: { name: $name, category: $category }) {
      photoId
    }
  }
`;

const ALL_PHOTOS = gql`
  query {
    allPhotos {
      name
      category
      url
      postedBy {
        userId
      }
    }
  }
`;

export const PhotosPage = () => {
  const token = localStorage.getItem("token");

  const { loading, data, refetch } = useQuery(ALL_PHOTOS);
  const [photo, setPhoto] = useState({ name: "", category: "SELFIE" });
  const [createPhoto] = useMutation(CREATE_PHOTO, {
    context: { headers: { authorization: token } },
  });

  return (
    <Page>
      <p>Photo Page</p>
      <section>
        {loading ? (
          <p>Loading</p>
        ) : (
          data.allPhotos.map((x) => <p>{JSON.stringify(x)}</p>)
        )}
      </section>
      <section>
        <input
          name="name"
          value={photo.name}
          onChange={(e) => setPhoto({ ...photo, name: e.target.value })}
        />
        <select
          value={photo.category}
          onChange={(e) => setPhoto({ ...photo, category: e.target.value })}
        >
          <option value="SELFIE">SELFIE</option>
          <option value="PORTRAIT">PORTRAIT</option>
          <option value="ACTION">ACTION</option>
          <option value="LANDSCAPE">LANDSCAPE</option>
          <option value="GRAPHIC">GRAPHIC</option>
        </select>
        <button
          onClick={async () => {
            await createPhoto({ variables: { ...photo } });
            await refetch();
          }}
        >
          Create Photo
        </button>
      </section>
    </Page>
  );
};
