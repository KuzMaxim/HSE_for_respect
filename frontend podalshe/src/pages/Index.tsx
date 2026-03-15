import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromptInput from "@/components/PromptInput";
import ExampleChips from "@/components/ExampleChips";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-16">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-tight">
            Find the right stay in one prompt
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Tell us where, when, and your budget — we'll turn it into ready-to-book hotel options.
          </p>
          <div className="pt-4">
            <PromptInput />
            <ExampleChips />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
