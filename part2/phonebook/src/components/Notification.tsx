import '../assets/styles/style.css'

function Notification({ message }: { message: string }) {
  return <div className="notification">{message}</div>
}

export default Notification;
