import React from 'react';
import { useForm } from '@formspree/react';


function ContactForm() {
  const [state, handleSubmit] = useForm("mrgvvpvy");
  if (state.succeeded) {
    return (
      <div name='contact' className='w-full h-screen bg-[#014F86] flex justify-center items-center p-4'>
        <div className='flex flex-col max-w-[600px] w-full'>
          <div className='pb-8 flex flex-col justify-center w-full h-full items-center'>
            <p className='text-4xl font-bold inline border-b-4 border-cyan-500 text-gray-300'>Contact</p>
            <p className='text-gray-300 py-4'>Thanks for reaching out!</p>;
          </div>
        </div>
      </div>)

  }
  return (
    <form onSubmit={handleSubmit}>
      <div name='contact' className='w-full h-screen bg-[#014F86] flex justify-center items-center p-4'>
        <div className='flex flex-col max-w-[600px] w-full'>
          <div className='pb-8 flex flex-col justify-center w-full h-full items-center'>
            <p className='text-4xl font-bold inline border-b-4 border-cyan-500 text-gray-300'>Contact</p>
            <p className='text-gray-300 py-4'>Send me a message</p>
          </div>
          <input className='bg-[#ccd6f6] p-2 placeholder-black' type="text" placeholder='Name' name='name' />
          <input className='my-4 p-2 bg-[#ccd6f6] placeholder-black' type="email" placeholder='Email' name='email' />
          <textarea className='bg-[#ccd6f6] p-2 placeholder-black' name="message" rows="10" placeholder='Message'></textarea>
          <button className='text-white border-2 hover:bg-cyan-500 hover:border-cyan-500 px-4 py-3 my-8 mx-auto flex items-center' type="submit" disabled={state.submitting}>
            Submit
          </button>
        </div>
      </div>
    </form>


  );

}

function contact() {
  return (
    <ContactForm />
  );
}
export default contact;