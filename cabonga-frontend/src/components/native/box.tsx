import { useNavigate } from "@solidjs/router";
import { ParentComponent } from "solid-js";

const Box: ParentComponent<{title: string; description: string; path: string}> = props => {
  const navigate = useNavigate();

  return (
    <section class="b-rd-4 bg-white">
      <div class="p-5">
        <h2 class="mb-2 text-4 font-600">{props.title}</h2>
        <h3 class="mb-3 text-3 font-600 c-gray1">{props.description}</h3>
        <h3 onClick={() => navigate(props.path)} class="text-3 font-600 c-primary">Voir tout</h3>
        <ul class="max-h-100 overflow-y-auto">
          {props.children}
        </ul>
      </div>
    </section>
  );
};

export default Box;
