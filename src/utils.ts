export function formatDate(timestamp: string) {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds <= 1 ? "" : "s"} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  }
  const date = new Date(
    past.getUTCFullYear(),
    past.getUTCMonth(),
    past.getUTCDate()
  );
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

export function formatBirthDate(timestamp: string) {
  const today = new Date();
  const birthdayUTC = new Date(timestamp);

  const birthday = new Date(
    birthdayUTC.getUTCFullYear(),
    birthdayUTC.getUTCMonth(),
    birthdayUTC.getUTCDate()
  );

  birthday.setFullYear(today.getFullYear());

  if (today > birthday) {
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const diffInTime = birthday.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  const formattedBirthday = birthday.toLocaleDateString(undefined, options);

  if (diffInDays === 0) {
    return `Today: ${formattedBirthday}`;
  } else if (diffInDays > 0 && diffInDays <= 30) {
    return `in ${diffInDays} days: ${formattedBirthday}`;
  } else {
    return `on ${formattedBirthday}`;
  }
}
