export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-16 max-w-4xl mx-auto">
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4 lowercase">laurent del rey</h1>
        <p className="text-lg opacity-80 lowercase">
          i'm a designer currently living in nyc. i've been designing different type of things for the internet,
          from tiny controversial experiments to larger-scale consumer products.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4 lowercase">experience</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold lowercase">snap, inc.</h3>
            <p className="opacity-80 lowercase">sep '18 - sep '23</p>
            <p className="mt-2 lowercase">
              core product design team at snapchat. contributed to building for chat, calling, minis and the camera.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold lowercase">a quest called tribe</h3>
            <p className="opacity-80 lowercase">'15 - '18</p>
            <p className="mt-2 lowercase">
              series of social experiments backed by sequoia capital and kpcb. a messaging app, a calling app and a gaming app.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4 lowercase">contact</h2>
        <p className="lowercase">
          find me on{" "}
          <a href="https://twitter.com/laurentdelrey" target="_blank" rel="noopener noreferrer" 
             className="underline hover:no-underline">twitter</a> or{" "}
          <a href="mailto:laurent.desserrey@gmail.com" className="underline hover:no-underline">email</a>.
        </p>
      </section>
    </main>
  );
}