import React from "react";
import styled from "styled-components/native";

const DateHeaderText = styled.Text`
  font-size: 25;
  color: #292477;
`;

export default function DateHeader({ date }) {
  return <DateHeaderText>{date}</DateHeaderText>;
}
