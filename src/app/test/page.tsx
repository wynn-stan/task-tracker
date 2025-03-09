'use client';

import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { Formik } from 'formik';

import { Accordion, Confirm, Button, Dropdown, Field, Modal } from '../../components/';

export default function Page() {
  /**
   * State
   */
  const [showModal, setShowModal] = useState('modal-center');

  /**
   * function
   */
  const handleConfirm = () => {
    Confirm({
      header: 'Modal header',
      message: 'Here is a message',
      buttons: {
        proceed: { value: "Let's go" },
      },
    }).then(() => {
      //
    });
  };
  return (
    <div className="space-y-5 p-5">
      <h1>This is an H1 Tag</h1>
      <h2>This is an H2 Tag</h2>
      <h3>This is an H3 Tag</h3>
      <h4>This is an H4 Tag</h4>

      <p className="lead">This is a large text</p>

      <p>This is a paragraph tag</p>

      <small>This is a small text</small>

      <small className="smaller">This is a smaller text </small>

      <Accordion defaultActiveKey="item-1">
        <Accordion.Item eventKey="item-1">
          <Accordion.Header>Hi There. I`m the header</Accordion.Header>
          <Accordion.Body>
            <p>Here is some body content</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button className="btn-outline-gray" onClick={() => toast.success('Here is something cool')}>
        Toasts
      </Button>

      <Button className="btn-primary" onClick={() => handleConfirm()}>
        Button here
      </Button>

      <Dropdown>
        <Dropdown.Toggle>Toggle</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Formik
        initialValues={{}}
        onSubmit={() => {
          //
        }}
      >
        {({ setFieldTouched, setFieldValue }) => (
          <>
            <Field.Date
              name="name"
              onChange={() => {
                //
              }}
              {...{ setFieldValue, setFieldTouched }}
            />

            <Field.Checkbox name="something">This is my checkbox</Field.Checkbox>
          </>
        )}
      </Formik>

      <Field.Input withFormik={false} name="name" />

      <Button className="btn-primary" onClick={() => setShowModal('modal-center')}>
        Show center
      </Button>

      <Button className="btn-primary" onClick={() => setShowModal('modal-side')}>
        Show side
      </Button>

      <Toaster />

      <Modal show={showModal === 'modal-center'} onHide={() => setShowModal('')}>
        Here is the center
      </Modal>
      <Modal.Side show={showModal === 'modal-side'} onHide={() => setShowModal('')}>
        Here is the side
      </Modal.Side>
    </div>
  );
}
