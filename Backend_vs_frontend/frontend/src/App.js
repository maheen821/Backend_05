import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaPen, FaTrash } from 'react-icons/fa';
import "./App.css";

export default function App() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [form, setForm] = useState({
    name:"", email:"", password:"", phone:"", city:"", gender:"", dob:"", qualification:""
  });

  // Fetch all users
  const loadData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { loadData(); }, []);

  // =====================
  // Submit Form
  // =====================
  const submitForm = async (e) => {
    e.preventDefault();

    // Empty Field Validation
    const emptyField = Object.entries(form).find(([key, value]) => value.trim() === "");
    if (emptyField) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: `Please fill in the Empty field and then try again!`,
      });
      return; // Stop submission
    }

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/user/${id}`, form);
        Swal.fire("Updated!", "Record updated successfully", "success");
      } else {
        await axios.post("http://localhost:5000/api/user", form);
        Swal.fire("Registered!", "User added successfully", "success");
      }

      // Reset form after submission
      setForm({
        name:"", email:"", password:"", phone:"", city:"", gender:"", dob:"", qualification:""
      });
      setId("");
      loadData();
    } catch (error) {
      Swal.fire("Error!", "Something went wrong", "error");
      console.error(error);
    }
  };

  // Edit user
  const editUser = (u) => {
    setForm(u);
    setId(u._id);
  };

  // Delete user
  const deleteUser = async (uid) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Record will be deleted!",
      icon: "warning",
      showCancelButton: true
    });
    if (result.isConfirmed) {
      await axios.delete(`http://localhost:5000/api/user/${uid}`);
      Swal.fire("Deleted!", "Record removed", "success");
      loadData();
    }
  };

  return (
    <div className="container">

      <form className="card" onSubmit={submitForm}>
        <h2>Student Registration</h2>
        <p className="sub">Join us today ✨</p>

        <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <input placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} />
        <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <input type="date" placeholder="Date of Birth" value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})} />
        <input placeholder="Qualification" value={form.qualification} onChange={e=>setForm({...form,qualification:e.target.value})} />

        <button>{id ? "Update" : "Register"}</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Qualification</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.city}</td>
                <td>{u.gender}</td>
                <td>{u.dob}</td>
                <td>{u.qualification}</td>
                <td className="action-btns">
                  <button className="edit-btn" onClick={()=>editUser(u)}><FaPen /></button>
                  <button className="delete-btn" onClick={()=>deleteUser(u._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
