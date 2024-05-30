import styled from "styled-components";

export const InputButton = styled.button`
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    :hover {
        cursor: pointer;

        svg {
            stroke: #986db2 !important;
        }
    }

    :disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const NormalButton = styled.button`
    background: #ffaf4c;
    border-radius: 62px;
    color: #33221e;
    font-size: 18px;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    transition: all 0.3s;

    &:hover {
        color: #ffaf4c;
        background: #52412b;
    }
`;

export const BorderButton = styled(NormalButton)`
    border: 2px solid #ffaf4c;
    background: #1e1e1e;
    color: #ffaf4c;
`;
