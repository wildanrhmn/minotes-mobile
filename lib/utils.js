function formatFirestoreTimestamp(timestamp) {
    const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()]; // Get the month abbreviation
    const day = date.getDate(); // Get the day of the month
  
    return `${month} ${day}`;
  }

  export { formatFirestoreTimestamp }