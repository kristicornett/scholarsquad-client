import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import {
  getAllSchools,
  getSchoolsForRegister,
} from "../../managers/SchoolManager";

export const Register = ({ setToken }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const grade = useRef()
  const school = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const account_type = useRef();
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);

  const handleRegister = (event) => {
    event.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        school: school.current.value,
        account_type: account_type.current.value,
        grade: grade.current.value
      };

      registerUser(newUser).then((response) => {
        if (response.token) {
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  useEffect(() => {
    getSchoolsForRegister().then((data) => {
      setSchools(data);
    });
  }, []);

  return (
    <section>
      <form onSubmit={handleRegister}>
        <h1 className="title">Scholar Squad</h1>
        <p className="subtitle">Create An Account</p>
        <div className="field">
          <label className="label">First Name</label>
          <div>
            <input className="input" type="text" ref={firstName} />
          </div>
        </div>
        <div className="field">
          <label className="label">Last Name</label>
          <div className="control">
            <input className="input" type="text" ref={lastName} />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" ref={email} />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="field-body">
            <div className="field">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </p>
            </div>

            <div className="field">
              <p className="control is-expanded">
                <input
                  className="input"
                  type="password"
                  placeholder="Verify Password"
                  ref={verifyPassword}
                />
              </p>
            </div>
          </div>
        </div>
        <select className="form-select" ref={school}>
          <option>Please select school</option>
          {schools.map((school) => {
            return (
              <option key={school.id} value={school.name}>
                {school.name}
              </option>
            );
          })}
        </select>
        <div></div>
        <div>
          <select className="form-select" ref={account_type}>
            <option>Please select account type</option>
            <option key={1} value={"teacher"}>
              {"teacher"}
            </option>
            <option key={1} value={"student"}>
              {"student"}
            </option>
          </select>
        </div>
        <div className="field">
          <label className="label">Grade</label>
          <div className="control">
            <input className="input" type="number" ref={grade} />
          </div>
        </div>
        <div>
          <div className="control">
            <button className="button is-link" type="submit">
              Submit
            </button>
          </div>
          <div className="control">
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </section>
  );
};
