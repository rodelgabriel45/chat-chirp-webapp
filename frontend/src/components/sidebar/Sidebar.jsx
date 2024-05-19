/* eslint-disable react-hooks/exhaustive-deps */
import toast from "react-hot-toast";
import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import { SlLogout } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { CircularProgressbar } from "react-circular-progressbar";
import { IoMdCloseCircleOutline } from "react-icons/io";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { clearCurrentUser } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase";
import useUpdateProfile from "../../hooks/useUpdateProfile";

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const dialog = useRef();
  const [modalData, setModalData] = useState({});
  const uploadInput = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [fileUploadPerc, setFileUploadPerc] = useState(null);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const { loading, updateProfile } = useUpdateProfile();

  useEffect(() => {
    const modal = dialog.current;

    if (showModal) {
      modal.showModal();
    }

    return () => {
      modal.close();
    };
  }, [showModal]);

  const handleSelectImage = (e) => {
    const image = e.target.files[0];
    setImageFile(image);
    setImageURL(URL.createObjectURL(image));
  };

  const handleSignout = async () => {
    const proceed = window.confirm("Are you sure you want to logout now?");

    if (proceed) {
      try {
        const res = await fetch("/api/auth/signout");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        dispatch(clearCurrentUser());
        toast.success("Logged out successfully!");
      } catch (error) {
        toast.error(error.message || error);
      }
    }
  };

  const handleChange = (e) => {
    setModalData({
      ...modalData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, filename);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    setFileUploadErr(false);
    setImageUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPerc(progress.toFixed(0));
      },
      (error) => {
        setFileUploadErr(true);
        setFileUploadPerc(false);
        setImageFile(null);
        setImageURL(null);
        setImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setModalData({
            ...modalData,
            profilePicture: downloadUrl,
          });
          setImageUploading(false);
          setImageFile(null);
          setFileUploadPerc(false);
          toast.success("New image uploaded. Click update profile now!");
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(modalData);
  };

  return (
    <div className="border-r border-gray-600 px-3 flex flex-col">
      <SearchInput />
      <div className="divider p-3"></div>
      <Conversations />
      <div className="flex flex-col mt-auto">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex gap-2 items-center hover:bg-gray-400 p-2 rounded-md hover:text-white"
        >
          <IoSettingsOutline />
          <span>Settings</span>
        </button>
        <button
          onClick={handleSignout}
          type="button"
          className="flex gap-2 items-center hover:bg-red-400 p-2 rounded-md hover:text-white"
        >
          <SlLogout />
          <span>Logout</span>
        </button>
      </div>
      {/* Modal */}
      <dialog
        ref={dialog}
        className="modal"
        onClose={() => setShowModal(false)}
      >
        <div className="modal-box w-11/12 max-w-xl text-center relative">
          <h2 className="text-xl mb-10 font-bold">Profile Settings</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-4"
          >
            <input
              onChange={handleSelectImage}
              ref={uploadInput}
              type="file"
              accept="image/*"
              hidden
            />

            <div
              onClick={() => uploadInput.current.click()}
              className="w-24 h-24 mb-10 sm:w-32 sm:h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative"
            >
              {fileUploadPerc && (
                <CircularProgressbar
                  value={fileUploadPerc}
                  text={`${fileUploadPerc}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgb(62,152,199, ${fileUploadPerc / 100})`,
                    },
                  }}
                />
              )}
              <img
                src={imageURL || currentUser.profilePicture}
                alt="Display Picture"
                className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${
                  fileUploadPerc && fileUploadPerc < 100 && "opacity-60"
                }`}
              />
            </div>

            <input
              id="username"
              type="text"
              className="input input-bordered w-full max-w-xs focus:outline-none text-white"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
            <input
              id="email"
              type="email"
              className="input input-bordered w-full max-w-xs focus:outline-none text-white"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <input
              id="password"
              type="password"
              className="input input-bordered w-full max-w-xs focus:outline-none text-white"
              onChange={handleChange}
              placeholder="Password..."
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-amber-500 p-3 rounded-md text-black font-medium hover:bg-amber-600 shadow-md disabled:opacity-80"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
          <div className="absolute inset-y-0 right-0 top-5 px-5 text-3xl ">
            <IoMdCloseCircleOutline
              onClick={() => setShowModal(false)}
              className="cursor-pointer hover:text-red-500"
            />
          </div>
        </div>
      </dialog>
    </div>
  );
}
