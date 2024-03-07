

const getDifficultyBackgroundColour = (grade) => {
    if (grade <= 17) {
        return '#66b320'
    } else if ((grade > 17) && (grade <= 20)) {
        return '#f9e11a'
    } else if ((grade > 20) && (grade <= 22)) {
        return '#f29a14'
    } else if ((grade > 22) && (grade <= 25)) {
        return '#cc2c28'
    } else {
        return '#9f247b'
    }
}

const getTextColour = (grade) => {
    if (grade <= 17) {
        return '#000000'
    } else if ((grade > 17) && (grade <= 20)) {
        return '#000000'
    } else if ((grade > 20) && (grade <= 22)) {
        return '#000000'
    } else if ((grade > 22) && (grade <= 25)) {
        return '#ffffff'
    } else {
        return '#ffffff'
    }
}

const RouteGrade = ({ grade }) => {
    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            border: '1px solid black',
            backgroundColor: getDifficultyBackgroundColour(grade),
            color: getTextColour(grade),
            padding: '4px',
            borderRadius: '7px'
        }}>
            {grade}
        </div>
    )
}

export default RouteGrade;