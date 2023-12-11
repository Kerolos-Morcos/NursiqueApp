import Icon from 'react-native-vector-icons/FontAwesome';

const MAX_RATING = 5; // Maximum rating value

function DevicesRate({ rate }) {
    // Calculate the number of full stars and half stars
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 !== 0;

    // Create an array of star icons to render
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Icon name="star" key={i} size={22} style={{ color: "#EEED3F" }} />);
    }
    if (hasHalfStar) {
        stars.push(<Icon name="star-half-full" key="half" size={22} style={{ color: "#EEED3F" }} />);
    }

    // Fill the remaining space with empty stars
    const remainingStars = MAX_RATING - stars.length;
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<Icon name="star-o" key={i + fullStars + (hasHalfStar ? 1 : 0)} size={22} style={{ color: "#EEED3F" }} />);
    }

    return (
        <>
            {stars}
        </>
    );
};

export default DevicesRate;