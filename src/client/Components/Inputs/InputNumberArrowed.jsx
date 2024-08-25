import React, {useEffect, useState} from "react";
import {Box} from "Components/Box";
import {Button} from "Components/Buttons";
import styled, {css} from "styled-components";
import {isNumeric} from "src/client/helpers";
import {BLACK, GREY4} from "src/client/styles/index";
import {Input} from "./InputBase";

const InnerWrapBox = styled(Box)`
  ${(p) =>
    p.arrows &&
    css`
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield; /* Firefox */
      }
    `}
`;

const ArrowButton = (props) => {
  return (
    <Button
      {...props}
      {...{
        inline: false,
        bg: GREY4,
        fg: BLACK,
        width: "1.2rem",
        height: "1.2rem",
        shadow: 1,
      }}
    />
  );
};

export const InputNumberArrowed = (props) => {
  const {innerWrapProps = {}, value, min, max, onChange} = props;
  const [val, setVal] = useState(value);

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (isNumeric(value)) onChange(Number.parseInt(value, 10));
  };

  useEffect(() => {
    onChange(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  const InnerComponentWrap = ({children, arrows = true}) => (
    <InnerWrapBox {...{gap: "0.3rem", left: true, arrows}}>
      {arrows && (
        <ArrowButton
          {...{
            onClick: () => (!min || (min && val - 1 >= min)) && setVal(val - 1),
          }}
        >
          -
        </ArrowButton>
      )}
      {children}
      {arrows && (
        <ArrowButton
          {...{
            onClick: () => (!max || (max && val + 1 <= max)) && setVal(val + 1),
          }}
        >
          +
        </ArrowButton>
      )}
    </InnerWrapBox>
  );

  return (
    <Input
      {...{
        type: "number",
        innerWrapProps,
        InnerComponentWrap,
        ...props,
        onChange: handleChange,
        value: val,
      }}
    />
  );
};
