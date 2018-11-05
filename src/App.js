import React, { Component } from "react";
import { createStore } from "redux";
import DatePicker from "react-date-picker";
import { Provider } from "react-redux";
import { reduxForm, Form, Field, reducer as formReducer } from "redux-form";

import "./App.css";

const store = createStore((state = {}, action) => {
  return { form: formReducer(state.form, action) };
});

class DatePickerComponent extends Component {
  onChange = value => {
    this.props.input.onChange(value);
  };

  render = () => {
    const { name } = this.props;

    return (
      <DatePicker
        name={name}
        onChange={this.onChange}
        value={this.props.input.value}
      />
    );
  };
}

const AppForm = () => {
  return (
    <Form onSubmit={() => {}}>
      <Field component={DatePickerComponent} name="field" />
    </Form>
  );
};

const Wrapped = reduxForm({ form: "app" })(AppForm);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <Wrapped />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
