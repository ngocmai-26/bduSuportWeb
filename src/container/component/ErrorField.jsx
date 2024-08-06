export const ErrorField = ({ errors, field }) => {
    return (
      <>
        {errors[field] && errors[field] != "" && (
          <span className="text-xs text-red-500">{errors[field]}</span>
        )}
      </>
    );
  };
  