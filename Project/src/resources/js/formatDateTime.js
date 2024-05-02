function formatDateTime(isoString) {
    const date = new Date(isoString);
    
    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    
    // Extract time components
    // console.log("Hours "+date.getHours()+isoString)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    // Construct formatted date/time string
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    
    // Return formatted date/time string
    return `${formattedDate} - ${formattedTime}`;
}