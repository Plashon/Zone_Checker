const Profile = ({ logout, user }) => {
    const handleLogout = () => {
      logout();
    };
  
    const concealedText = (str, start, end) => {
      if (
        !str ||
        start < 0 ||
        start > str.length ||
        end < 0 ||
        end > str.length ||
        start > end
      ) {
        return str;
      }
      const maskedStr =
        str.substring(0, start) + "*".repeat(20) + str.substring(end);
      return maskedStr;
    };
  
    const profilePic =
      "https://images.unsplash.com/photo-1535076766578-839cd64d7a73?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  
    return (
      <div>
        {" "}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-9 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={profilePic} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a
                onClick={() =>
                  document.getElementById(`modal_profile`).showModal()
                }
                className="justify-between"
              >
                Profile
              </a>
            </li>
            <li>
              <a onClick={handleLogout} href="/">Logout</a>
            </li>
          </ul>
        </div>
        <dialog id={`modal_profile`} className="modal">
          <div className="modal-box w-11/12 max-w-4xl">
            <div className="flex flex-row space-x-10">
              <img
                src={profilePic}
                className="w-56 h-56 object-cover rounded-full"
                alt=""
              />
              <div className="my-12">
                <h1 className="text-xl font-semibold">
                  Username : {user.userName}
                </h1>
                <h1 className="text-xl font-semibold">Email : {user.email}</h1>
                <h1 className="text-xl font-semibold">
                  AccessToken :{" "}
                  {concealedText(
                    user.accessToken,
                    3,
                    user.accessToken.length - 3
                  )}
                </h1>
                <h1 className="text-xl font-semibold">
                  Roles :{" "}
                  <span className="text-emerald-700">
                    {user?.roles.map((role) => role).join(", ")}
                  </span>
                </h1>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
  };
  
  export default Profile;