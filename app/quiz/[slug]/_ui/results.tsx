type ResultsProps = {
  grade: number;
};

export default function Results({ grade }: ResultsProps) {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex justify-center items-center mt-[23vh] w-38.5 h-38.5 text-3xl font-medium border-3 border-tertiary rounded-full">
        {grade}%
      </div>
      <p className="mt-8 text-center">
        {grade >= 80
          ? "Amazing work!"
          : "Almost there! A score of 80% is required to the pass quiz. Please try again."}
      </p>
    </section>
  );
}
