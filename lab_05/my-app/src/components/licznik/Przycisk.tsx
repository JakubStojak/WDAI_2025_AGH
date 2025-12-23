interface PrzyciskProps {
    onClickAction: () => void;
}

const Przycisk = ({ onClickAction }: PrzyciskProps) => {
    return (
        <button onClick={onClickAction}>
            Zwiększ
        </button>
    );
};

export default Przycisk;