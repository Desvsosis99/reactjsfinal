const Notification = ({ notificacionData }) => {
  const colors = {
      success: 'green',
      error: 'red',
      warning: 'orange',
      info: 'blue'
  };

  const title = {
      success: '¡Felicitaciones!',
      error: 'Error',
      warning: 'Advertencia',
      info: 'Información'
  };

  const notificationStyle = {
      position: 'fixed',  
      top: 100,
      right: 30,
      zIndex: 1050,  
      backgroundColor: colors[notificacionData.type],
      color: 'white',
      padding: 20,
      borderRadius: 10,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
      maxWidth: '300px', 
      wordWrap: 'break-word', 
      fontSize: '1rem', 
      lineHeight: '1.5'
  };

  return (
      <article style={notificationStyle}>
          <h4 style={{ margin: 0 }}>{title[notificacionData.type]}</h4>
          <p style={{ margin: '10px 0 0' }}>{notificacionData.text}</p>
      </article>
  );
};

export default Notification;
