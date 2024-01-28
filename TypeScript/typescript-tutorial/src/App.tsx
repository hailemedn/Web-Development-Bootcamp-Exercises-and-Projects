import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';

const App:React.FC = () => {
  // let id: any; //not recommended
  // let identificaton: unknown;
  // let name: string;
  // let age: number;
  // let tag: string | number; //union, takes string or number;
  // let isLegal: boolean;
  // let hobbies: string[];
  // let scores: number[];
  // let role: [number, string]

  // // type Person = {
  // //   name: string;
  // //   age?: number;
  // // }

  // interface Person {
  //   name: string,
  //   age?: number,
  // };

  // let person: Person = {
  //   name: "Haile"
  // };

  // let lotsOfPeople: Person[];

  // lotsOfPeople = [
  //  {name: "Haile"},
  //  {name: "Segio", age: 36}
  // ];

  // let printName: (name: string) => void; //output type unknown yet
  // let someMethod: (name: string) => number;
  // let anotherFunction: (age: number) => never; //outputs nothing


  // //extending properties in alices
  // //type
  // type X = {
  //   a: string;
  //   b: number;
  // }

  // type Y = X & {
  //   c: string;
  //   d: number;
  // }

  // let y: Y = {
  //   a: "ere",
  //   b: 32,
  //   c: "hmm",
  //   d: 12
  // }


  // //interfaces
  // interface student extends Person {
  //   grade: string;
  // }

  // let gukesh: student = {
  //   name: 'Gukesh',
  //   age: 17,
  //   grade: 'A',
  // }

  // //extending property inside an interface to a type
  // type N = Person & {
  //   a:string;
  //   b:number;
  // }

  // let someOne:N = {
  //   name: "someone",
  //   a: "a",
  //   b: 12,
  // }

  // //extending property inside type to an interface
  // interface M extends N {
  //   c: string;
  //   d: number;
  // }

  // let anotherSomeOne:M = {
  //   name: "anotherSomeOne",
  //   a: "try",
  //   b: 12,
  //   c: "again",
  //   d: 21
  // }

  // console.log(lotsOfPeople);
  const [todo, setTodo] = useState<string>("");
  console.log(todo);
  return (
    <div className="App">
      <h1 className='heading'>Taskify</h1>
      <InputField todo={todo} setTodo={setTodo}  />
    </div>
  );
}

export default App;
