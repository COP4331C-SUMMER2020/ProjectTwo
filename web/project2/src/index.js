import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import useFormValidation from "./useFormValidation";
import validateAuth from "./validateAuth";

const INITIAL_STATE = {
  email: "",
  password: ""
};

function Index() {
	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		isSubmitting
	} = useFormValidation(INITIAL_STATE, validateAuth);
	
	return (
		<div>
			<div>
				<Login />
				<Register />
			</div>
			<div>
				<IngredientSearch />
				<RecipeSearch />
				<AddRecipe />
			</div>	
			<div>
				<APIreturn />
			</div>
		</div>
	);
}

function APIreturn() {
	return (
		<div className="container">
			<h1>API Return</h1>
			<textarea
				id="apireturn"
				name="apireturn"
				row="4"
				cols="50"
			/>
		</div>
	);
}

function AddRecipe() {
	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		isSubmitting
	} = useFormValidation(INITIAL_STATE, validateAuth);
	
	return (
		<div className="container">
			<h1>Add Recipe</h1>
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					onBlur={handleBlur}
					name="newrecipename"
					autoComplete="off"
					placeholder="Recipe Name"
				/>
				<div>
				<button disabled={isSubmitting} type="submit">
					Submit
				</button>
				</div>
			</form>
		</div>
	);
}

function IngredientSearch() {
	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		isSubmitting
	} = useFormValidation(INITIAL_STATE, validateAuth);
	
	return (
		<div className="container">
			<h1>Ingredient Search</h1>
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					onBlur={handleBlur}
					name="ingredientname"
					autoComplete="off"
					placeholder="Search Term"
				/>
				<div>
				<button disabled={isSubmitting} type="submit">
					Submit
				</button>
				</div>
			</form>
		</div>
	);
}

function RecipeSearch() {
	const {
		handleSubmit,
		handleChange,
		handleBlur,
		values,
		errors,
		isSubmitting
	} = useFormValidation(INITIAL_STATE, validateAuth);
	
	return (
		<div className="container">
			<h1>Recipe Search</h1>
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					onBlur={handleBlur}
					name="recipename"
					autoComplete="off"
					placeholder="Search Term"
				/>
				<div>
				<button disabled={isSubmitting} type="submit">
					Submit
				</button>
				</div>
			</form>
		</div>
	);
}

function Login() {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateAuth);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  return (
    <div className="container">
      <h1>Login Test</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="loginemail"
          value={values.email}
          className={errors.email && "error-input"}
          autoComplete="off"
          placeholder="Your email address"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && "error-input"}
          name="loginpassword"
          type="password"
          placeholder="Choose a safe password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div>
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function Register() {
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateAuth);
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  return (
    <div className="container">
      <h1>Register Test</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="registeremail"
          value={values.email}
          className={errors.email && "error-input"}
          autoComplete="off"
          placeholder="Your email address"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && "error-input"}
          name="registerpassword"
          type="password"
          placeholder="Choose a safe password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div>
          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);