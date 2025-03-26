import Input from './components/Input';
import Form, { type FormHandle } from './components/Form';
import { useRef } from 'react';
import Button from './components/Button';
import Container from './components/Container';

function App() {
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    const extractedData = data as {name: string, age: string};
    console.log("Inside the handleSave method of App: ", extractedData);
    if (
      !data ||
      typeof data !== 'object' ||
      !('name' in data) ||
      !('age' in data)
    ) {
        return;
    }

    customForm.current?.clear();
  }

  return (
    <main>
      <Form onSave={handleSave} ref={customForm}>
        <Input id="name" label="Name" type="text" />
        <Input id="age" label="Age" type="number"/>
        <p>
          <Button type="submit">Save</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;
