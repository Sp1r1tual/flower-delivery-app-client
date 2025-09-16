interface MarkerStyles {
  container: Partial<CSSStyleDeclaration>;
  label: Partial<CSSStyleDeclaration>;
  circle: Partial<CSSStyleDeclaration>;
}

const storeMarkerStyles: MarkerStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  circle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#FF0000",
  },
};

const clickMarkerStyles: MarkerStyles = {
  container: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#0000FF",
  },
  label: {},
  circle: {},
};

export { storeMarkerStyles, clickMarkerStyles };
