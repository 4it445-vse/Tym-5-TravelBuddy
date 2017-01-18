import React from 'react';
import {shallow} from 'enzyme';
import {RegistrationForm} from '../components/Registration/RegistrationForm';

it('Gender picker changes the active state after click', () => {
    // Render a checkbox with label in the document
    const registrationForm = shallow(
        <RegistrationForm/>
    );
    registrationForm.find('gender').text();

  //  registrationForm.find('gender').setGender("Female");
   // expect(gender.find('gender').text()).toEqual('Feale');

    expect(registrationForm.find('gender').text()).toEqual('Female');
});