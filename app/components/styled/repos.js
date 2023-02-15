import { Card, Tag } from 'antd';
import styled from '@emotion/styled';
import { colors } from '@themes';

export const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

export const YouAreAwesome = styled.a`
  text-align: right;

  && {
    span {
      color: ${colors.primary};
      text-decoration: underline;
      :hover {
        opacity: 0.8;
      }
    }
  }
`;

export const ClickableTags = styled(Tag)`
  cursor: pointer;
  :hover {
    border: 1px solid ${colors.primary};
  }
`;
