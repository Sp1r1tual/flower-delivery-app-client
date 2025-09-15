const markerStyles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
  },
  label: {
    background: "white",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
    marginBottom: "4px",
  },
  storeCircle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#FF0000",
  },
  clickCircle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#0000FF",
  },
};

export { markerStyles };
