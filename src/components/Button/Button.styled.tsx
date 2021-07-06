import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { ButtonProps } from './Button';

export const ButtonStyled = styled.button(({ variant = 'default' }: ButtonProps) => [
  // The common button styles added with the tw import
  tw`relative shadow border font-normal py-2 px-4 rounded-md w-max`,

  // Use props to conditionally style your components
  variant === 'default' &&
    tw`border-gray-300 bg-gray-200 hover:bg-gray-300 hover:shadow-md text-gray-800 focus:outline-none focus:ring focus:border-[#7BAAFA]`,

  // Combine regular css with tailwind classes within backticks
  variant === 'primary' && tw`bg-blue-600 hover:bg-blue-700 hover:shadow-md text-white`,

  variant === 'secondary' && tw`bg-red-600 hover:bg-red-700 hover:shadow-md text-white`
]);
