// Import deps
import React from 'react'
// Create interfaces
interface UserListRow {
  book: {
    username: string;
    gmail: string;
    password: string;
    first_name: string;
    last_name: string;
  }
  handleUserRemove: (username: string, gmail: string) => void;
}
// Create BookshelfListRow component
export const UserListRow = (props: UserListRow) => (
  <tr className="table-row">
    <td className="table-item">
      {props.book.username}
    </td>
    <td className="table-item">
      {props.book.gmail}
    </td>
    <td className="table-item">
      {props.book.password}
    </td>
    <td className="table-item">
      {props.book.first_name}
    </td>
    <td className="table-item">
      {props.book.last_name}
    </td>
    <td className="table-item">
      <button
        className="btn btn-remove"
        onClick={() => props.handleUserRemove(props.book.username, props.book.gmail)}>
        Remove book
      </button>
    </td>
  </tr>
)
