import styled from '@emotion/styled';
import { colors } from '@themes';
import { OutlinedInput, Chip, Card } from '@mui/material';

export const CustomCard = styled(Card)`
  && {
    margin: 1rem 0;
    padding: ${(props) => props.padding ?? '1rem'};
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

export const YouAreAwesome = styled.a`
  text-align: right;
  min-width: fit-content;
  margin-left: auto;

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

export const ClickableTags = styled(Chip)`
  margin-bottom: 1.5rem;
  :hover {
    border: 1px solid ${colors.primary};
  }
`;

export const StyledOutlinedInput = styled(OutlinedInput)`
  height: 2.25rem;
  legend {
    display: none;
  }
  > fieldset {
    top: 0;
  }
`;

export const CardContainer = styled.div`
  && {
    margin: 1.25rem 0;
    padding: 1.25rem;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 4px;
  }
`;
