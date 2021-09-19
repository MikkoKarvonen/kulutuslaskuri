const calculateDuration = (distance: number, speed: number) => {
  const duration = distance / speed;
  const helperDate = new Date(0, 0);
  helperDate.setSeconds(+duration * 60 * 60);
  if (duration < 1) {
    return `${helperDate.toLocaleTimeString([], {
      minute: "2-digit",
    })}min`;
  } else {
    return `${helperDate.toLocaleTimeString([], {
      hour: "numeric",
    })}h ${helperDate.toLocaleTimeString([], {
      minute: "2-digit",
    })}min`;
  }
};

const calculateConsuption = (
  selectedConsuption: number,
  slope: number,
  distance: number,
  speed: number
) => {
  const consuption =
    (selectedConsuption * Math.pow(slope, distance) * speed) / 100;
  return Math.round(consuption * 10) / 10;
};

const calculateDurationDifference = (
  distance: number,
  speed1: number,
  speed2: number
) => {
  const difference = Math.abs(distance / speed2 - distance / speed1);
  const helperDate = new Date(0, 0);
  helperDate.setSeconds(+difference * 60 * 60);
  if (difference < 1) {
    return `${helperDate.toLocaleTimeString([], {
      minute: "2-digit",
    })}min`;
  } else {
    return `${helperDate.toLocaleTimeString([], {
      hour: "numeric",
    })}h ${helperDate.toLocaleTimeString([], {
      minute: "2-digit",
    })}min`;
  }
};

const calculateConsuptionDifference = (
  selectedConsuption: number,
  slope: number,
  distance: number,
  speed1: number,
  speed2: number
) => {
  const difference = Math.abs(
    (selectedConsuption * Math.pow(slope, distance) * speed1) / 100 -
      (selectedConsuption * Math.pow(slope, distance) * speed2) / 100
  );
  return Math.round(difference * 10) / 10;
};

const functions = {
  calculateDuration,
  calculateConsuption,
  calculateDurationDifference,
  calculateConsuptionDifference,
};

export default functions;
