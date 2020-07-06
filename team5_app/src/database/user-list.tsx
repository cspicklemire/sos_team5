// Import deps
import React from 'react'
// Import components
import { UserListRow } from './users-list-row'
// Import styles
import './../users-list.css'
// Create interfaces
interface UserUI {
    username: string;
    gmail: string;
    password: string;
    first_name: string;
    last_name: string;
}
interface UserListUI {
  users: UserUI[];
  loading: boolean;
  handleUserRemove: (username: string, gmail: string) => void;
}
// Create BookshelfList component
export const UserList = (props: UserListUI) => {
  // Show loading message
  if (props.loading) return <p>User table is loading...</p>
  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />
            <th className="table-head-item">Title</th>
            <th className="table-head-item">Author</th>
            <th className="table-head-item">Pub. date</th>
            <th className="table-head-item">Rating</th>
            <th className="table-head-item" />
          </tr>
        </thead>
        <tbody className="table-body">
          {props.users.length > 0 ? (
            props.users.map((book: UserUI, idx) => (
              <UserListRow
                key={book.username}
                book={book}
                handleUserRemove={props.handleUserRemove}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no users to show. Create one!</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}