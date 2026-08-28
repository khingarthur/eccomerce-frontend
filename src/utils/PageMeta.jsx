export const PageMeta = ({ title, description }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
};
