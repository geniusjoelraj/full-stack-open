import '../assets/styles/style.css'

function Notification({ message, type }: { message: string, type: string }) {
  return <div className={`notification ${type}`}>{message}</div>
}

export default Notification;
