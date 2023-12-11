import Icon from 'react-native-vector-icons/FontAwesome';

const MAX_RATING = 5; // Maximum rating value

const NurseRate = ({ rate }) => {
    const fullStars = Math.floor(rate); // Calculate the number of full stars
    const remainingStars = MAX_RATING - fullStars; // Calculate the number of remaining stars

    // Create an array of star icons to render
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Icon name="star" key={i} size={20} style={{ color: "#EEED3F" }} />);
    }

    // Check if there's a remainder to determine if a half star should be displayed
    if (rate % 1 !== 0) {
        stars.push(<Icon name="star-half-full" key="half" size={20} style={{ color: "#EEED3F" }} />);
    }

    // Fill the remaining space with empty stars
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<Icon name="star-o" key={i + fullStars} size={20} style={{ color: "#EEED3F" }} />);
    }

    return (
        <>
            {stars}
        </>
    );
}

export default NurseRate;
