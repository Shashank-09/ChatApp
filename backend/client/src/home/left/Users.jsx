import getAllUsers from "../../context/getAllUsers"
import User from "./User"

const Users = () => {
  const [allUsers , loadind] = getAllUsers()
  console.log(allUsers)
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold selected-user rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
         {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Users