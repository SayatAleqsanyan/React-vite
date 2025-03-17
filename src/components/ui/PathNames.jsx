const PathNames = (pathname) => {
  const pathSegments = pathname.split("/").filter(segment => segment !== "");

  const breadcrumbs = pathSegments.map(segment => {
    return (segment.charAt(0).toUpperCase() + segment.slice(1));
  });

  return pathname === "/" ? "Home" : [...breadcrumbs].join(" > ");
};

export default PathNames;