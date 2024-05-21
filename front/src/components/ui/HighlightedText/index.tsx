export default function HighlightedText(props: {text: string, searchTerm?: string, searchTerm2?: string}) {
    const {text, searchTerm, searchTerm2} = props

    if (!searchTerm) {
      return <>{text}</>;
    }

    else {
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      const regex2 = new RegExp(`(${searchTerm2})`, 'gi');

      const parts = text.toString().split(regex);

      return (
        <>
          {parts.map((part, i) => (
            <>
              {part.toLowerCase() === searchTerm.toLowerCase() ? (
                <mark className="px-1 rounded-md inline-flex">{part}</mark>
              ) : (
                part
              )}
            </>
          ))}
        </>
      );
    }
  }