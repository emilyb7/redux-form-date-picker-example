import React, { Component } from "react";
import { createStore } from "redux";
import DatePicker from "react-date-picker";
import { Provider } from "react-redux";
import { reduxForm, Form, Field, reducer as formReducer } from "redux-form";

import "./App.css";

const DatePickerComponent = ({ input: { onChange, name, value } }) => {
  return <DatePicker name={name} onChange={onChange} value={value} />;
};

const AppForm = ({ handleSubmit }) => {
  return (
    <Form
      onSubmit={handleSubmit(values => {
        console.log("form submitted with values: ", values);
        return null;
      })}
    >
      <Field component={DatePickerComponent} name="date" />
      <button type="submit">Submit</button>
    </Form>
  );
};

const validator = ({ date }) => (date ? null : { date: "error" });

const Wrapped = reduxForm({ form: "app", validate: validator })(AppForm);

const store = createStore((state = {}, action) => {
  return { form: formReducer(state.form, action) };
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Wrapped />
        </div>
      </Provider>
    );
  }
}

export default App;
