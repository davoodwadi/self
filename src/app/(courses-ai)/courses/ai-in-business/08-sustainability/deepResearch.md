# The Dual Nature of Artificial Intelligence: Environmental Costs and Sustainable Solutions

**Key Points:**
*   **The AI Sustainability Paradox:** AI is simultaneously a powerful tool for climate mitigation (e.g., weather forecasting, grid optimization) and a significant environmental burden due to energy, water, and hardware demands.
*   **Water Consumption Crisis:** Recent 2025 research highlights a critical "water footprint" for AI, with large-scale inference potentially consuming billions of cubic meters globally by 2027.
*   **Regulatory Shift:** The EU AI Act (Article 40) and emerging ISO standards now mandate transparency regarding energy consumption and resource efficiency for General-Purpose AI (GPAI) models.
*   **Technological Pivots:** There is a marked shift from "Red AI" (accuracy at all costs) to "Green AI" (efficiency), driven by neuromorphic computing, quantization, and small language models (SLMs).

The intersection of Artificial Intelligence (AI) and sustainability represents one of the most complex dualities in modern technology. On one hand, "AI for Sustainability" offers transformative capabilities: Graph Neural Networks (GNNs) like GraphCast have revolutionized weather forecasting, allowing for earlier disaster warnings, while reinforcement learning optimizes renewable energy grids to reduce fossil fuel reliance. On the other hand, "Sustainable AI" addresses the growing environmental debt of the technology itself. The training and deployment of Large Language Models (LLMs) demand massive computational power, leading to significant carbon emissions, water consumption for cooling, and a rapidly growing stream of electronic waste (e-waste).

As of late 2024 and throughout 2025, the discourse has shifted from purely carbon-centric metrics to a holistic view including water scarcity and hardware lifecycles. New legislative frameworks, such as the EU AI Act, are forcing a transition from voluntary reporting to mandatory compliance. This report provides a deep research investigation into these conflicting dynamics, analyzing the latest methodologies, environmental impacts, and actionable pathways toward a sustainable AI ecosystem.

---

## 1. The Environmental Footprint of Large-Scale AI

The environmental impact of AI is often categorized into operational carbon (electricity used during training and inference) and embodied carbon (emissions from hardware manufacturing). However, recent research has expanded this scope to include water consumption and the toxicity of the hardware lifecycle.

### Carbon & Water Footprint: The Hidden Costs of Compute

The rapid adoption of Generative AI has escalated the demand for data center resources. While historically the focus was on the energy intensity of *training* models, 2025 research indicates that *inference* (the actual use of the model by millions of users) constitutes the majority of the lifecycle emissions for widely deployed models [cite: 1, 2].

**Operational Energy and Carbon**
Estimates regarding the energy consumption of LLMs vary based on model architecture and hardware efficiency.
*   **Training:** Training a model like GPT-3 was estimated to consume roughly 1,287 MWh of electricity and emit over 550 metric tons of CO2e [cite: 2, 3]. However, newer models (GPT-4, Gemini Ultra) are presumed to require orders of magnitude more compute, though exact figures are often proprietary.
*   **Inference:** Inference is the "sleeping giant" of AI energy consumption. A 2025 study analyzing 30 state-of-the-art models found a massive disparity in efficiency: energy-intensive models consumed over 29 Wh per long prompt, while efficient models used approximately 0.4 Wh [cite: 1].
*   **Google’s 2025 Environmental Report:** In a significant disclosure, Google reported that the median Gemini App text prompt consumes 0.24 Wh of energy and emits 0.03 grams of CO2e [cite: 4, 5]. While per-query figures appear low (comparable to 9 seconds of TV), the aggregate impact of billions of daily queries is substantial.

**The Water Footprint Crisis**
Water consumption has emerged as a critical, yet often overlooked, metric. Data centers require vast amounts of water for cooling to maintain operational temperatures for GPUs and TPUs.
*   **Consumption Rates:** Early estimates suggested that training GPT-3 consumed ~700,000 liters of freshwater [cite: 1, 6]. For inference, studies have debated the metric of "bottles of water per conversation." While some estimates suggest a 500ml bottle of water is consumed for every 20-50 queries [cite: 7, 8], Google’s 2025 report claims a much lower figure of 0.26 mL (five drops) per median query due to efficiency improvements [cite: 4, 5].
*   **Global Impact:** Despite efficiency gains, the sheer scale of AI expansion poses risks to local water tables. Projections indicate global AI water demand could reach 4.2 to 6.6 billion cubic meters by 2027—more than the total annual withdrawal of Denmark [cite: 1, 6].
*   **Scarcity Concerns:** Crucially, water usage is hyper-localized. A data center in a drought-stricken region (e.g., the American Southwest or parts of Chile) competes directly with residential and agricultural needs, raising issues of environmental justice [cite: 9, 10].

### Hardware Lifecycle and Electronic Waste

The "embodied footprint" of AI refers to the environmental cost of extracting raw materials, manufacturing chips, and disposing of hardware.

**Manufacturing Emissions**
Manufacturing advanced AI accelerators (GPUs, TPUs) is chemically intensive and energy-demanding.
*   **Life-Cycle Assessment (LCA):** A breakthrough 2025 study provided the first comprehensive cradle-to-grave LCA for AI accelerators. It highlighted that manufacturing emissions are significant but efficiency improvements (e.g., from TPU v4 to TPU v6) can improve the "Compute Carbon Intensity" (CCI) by 3x [cite: 11, 12].
*   **Resource Intensity:** Producing a single 2-gram chip can require 32 kg of water and huge amounts of ultra-pure chemicals. The complexity of 5nm and 3nm nodes increases the energy required for lithography processes [cite: 13, 14].

**The E-Waste Challenge**
AI hardware creates a specific stream of electronic waste due to rapid obsolescence.
*   **Accelerated Refresh Cycles:** Unlike general-purpose servers that may last 5-7 years, AI processors are often replaced every 2-3 years to maintain competitive advantage in training speeds [cite: 13, 15].
*   **Waste Volume:** Global e-waste reached 62 million tonnes in 2022. The specialized nature of AI chips, which contain hazardous materials and valuable rare earth elements intertwined in complex architectures, makes them difficult to recycle using conventional methods [cite: 16, 17].

### Data Center Efficiency

To mitigate these footprints, the industry is innovating in data center design.
*   **Cooling Innovations:** There is a shift toward liquid cooling (direct-to-chip or immersion cooling) which is more efficient than air cooling for high-density AI racks. However, this often involves trade-offs between water use and energy use (Water Usage Effectiveness vs. Power Usage Effectiveness) [cite: 5].
*   **Optimization:** DeepMind-style AI optimization of cooling systems continues to be a standard, reducing cooling energy by up to 40% [cite: 18].

---

## 2. AI for Climate Mitigation and Adaptation

"AI for Sustainability" leverages the pattern-recognition and predictive capabilities of AI to address climate challenges.

### Climate Modeling and Weather Prediction

AI has fundamentally disrupted meteorological forecasting, offering speed and accuracy improvements over traditional Numerical Weather Prediction (NWP).

*   **GraphCast:** Developed by Google DeepMind, GraphCast uses Graph Neural Networks (GNNs) to predict weather up to 10 days in advance. It operates at 0.25-degree resolution and outperforms the industry-standard ECMWF HRES model on 90% of verification targets while being orders of magnitude faster and more energy-efficient to run [cite: 19].
*   **FourCastNet:** NVIDIA's FourCastNet (now in version 3 as of 2025) utilizes a geometric machine learning approach (Spherical Fourier Neural Operators). It creates high-fidelity, high-resolution forecasts that respect the spherical geometry of the Earth, allowing for rapid ensemble forecasting to predict extreme weather probabilities [cite: 20, 21].
*   **Impact:** These models allow for "democratized" forecasting, where university groups can run global forecasts on a few GPUs, a task that previously required supercomputers [cite: 22].

### Renewable Energy Optimization

AI is essential for integrating variable renewable energy (VRE) sources like wind and solar into the grid.

*   **Forecasting:** AI models predict solar irradiance and wind speeds with high precision, allowing grid operators to balance supply and demand proactively.
*   **Grid Stability:** Reinforcement Learning (RL) is used to manage Hybrid Energy Storage Systems (HESS), optimizing the charging and discharging cycles of batteries to stabilize voltage and frequency fluctuations caused by renewables [cite: 23, 24].
*   **Efficiency:** AI-driven management has been shown to improve renewable energy system efficiency significantly (up to 90% efficiency vs. 67.5% for traditional methods) by minimizing losses and optimizing load flow [cite: 23, 25].

### Precision Agriculture

AI contributes to sustainability in agriculture by maximizing yield while minimizing chemical inputs and water use.

*   **Soil Health Monitoring:** AI analyzes data from satellite imagery, drones, and ground sensors to predict soil properties (moisture, pH, nutrients). This enables Variable Rate Technology (VRT) for precise fertilizer application, reducing runoff and nitrous oxide emissions [cite: 26, 27, 28].
*   **Water Conservation:** Smart irrigation systems powered by AI use real-time soil data and weather forecasts to optimize water delivery, critical for adaptation in water-scarce regions [cite: 27].

---

## 3. Green AI and Computational Efficiency

The concept of "Green AI" prioritizes computational efficiency as a primary evaluation metric alongside accuracy. This contrasts with "Red AI," which pursues state-of-the-art results through massive, energy-intensive models [cite: 29, 30].

### Efficient Architectures and Techniques

Research in 2024-2025 has solidified several methods to reduce the carbon cost of AI without sacrificing performance.

*   **Model Compression:**
    *   **Quantization:** Reducing the precision of model parameters (e.g., from 32-bit floating point to 8-bit or 4-bit integers). This reduces memory footprint and energy consumption during inference.
    *   **Pruning:** Removing redundant connections (weights) in a neural network. "Sparse" models require fewer calculations.
    *   **Knowledge Distillation:** Training a smaller "student" model to mimic the behavior of a massive "teacher" model. This allows for the deployment of efficient models on edge devices [cite: 31, 32, 33].
*   **Small Language Models (SLMs):** A growing trend ("Small is Sufficient") argues for using task-specific smaller models rather than massive generalist models for every query. Research indicates this could save roughly 28% of global AI electricity by 2025 [cite: 34].

### Neuromorphic Computing

Neuromorphic computing represents a hardware paradigm shift, moving away from the von Neumann architecture (where memory and processing are separate) to brain-inspired architectures.

*   **Mechanism:** These chips use "Spiking Neural Networks" (SNNs) where artificial neurons only "fire" (consume energy) when an event occurs. This event-driven processing eliminates the energy cost of constantly moving data between memory and processors [cite: 35, 36].
*   **Recent Breakthroughs:**
    *   **Intel Loihi 2 & BrainChip Akida:** 2025 has seen these chips move toward commercial viability, particularly for edge AI. They can be 100x to 1000x more energy-efficient than GPUs for specific tasks like sensory processing [cite: 36, 37, 38].
    *   **Integration:** New systems are appearing that integrate memory and compute (Compute-in-Memory), drastically reducing the "von Neumann bottleneck" [cite: 39].

---

## 4. Circular Economy and Biodiversity

AI is increasingly applied to physical environmental challenges, closing the loop on waste and monitoring the biosphere.

### Waste Management and Circular Economy

AI optimizes the "Circular Economy" by treating waste as a resource.

*   **Automated Sorting:** AI-powered computer vision combined with robotics (e.g., Recycleye, Glacier) can sort waste streams with high speed and accuracy, identifying plastics, metals, and e-waste components that manual sorters might miss [cite: 40, 41].
*   **E-Waste Recovery:** Startups like Mol-e are using AI to incentivize and track e-waste recycling, creating "Digital Waste Passports" to ensure transparency and recovery of valuable materials like gold and copper [cite: 42].
*   **Supply Chain:** AI predicts demand to prevent overproduction and optimize "reverse logistics" (the return and repair of goods) [cite: 40, 43].

### Biodiversity Monitoring

Real-time monitoring is essential for conservation, and AI provides the tools to scale this monitoring globally.

*   **Passive Acoustic Monitoring (PAM):** Projects like TABMON use networks of acoustic sensors to record soundscapes. AI algorithms filter noise and classify species (birds, marine mammals, amphibians) based on their calls. This is non-invasive and effective for elusive species [cite: 44, 45].
*   **Computer Vision:** Camera traps and underwater drones use edge AI to identify species in real-time. This has been applied to tracking insect biodiversity, deep-sea marine life, and detecting poachers in protected areas [cite: 44, 46, 47].

---

## 5. Policy, Standards, and Reporting

The era of voluntary "greenwashing" is ending as rigorous standards and regulations come into force.

### Global Regulations: The EU AI Act

The European Union's AI Act constitutes the most significant legal framework addressing AI sustainability.

*   **Article 40 & Transparency:** The Act mandates that the European Commission standardization bodies develop standards for reporting "AI systems resource performance," specifically focusing on energy efficiency [cite: 48, 49].
*   **General-Purpose AI (GPAI):** Providers of GPAI models (like GPT-4, Gemini) must publish detailed technical documentation including "known or estimated energy consumption." This applies to models trained with more than $10^{23}$ FLOPs [cite: 50, 51].
*   **Limitations:** Critics argue that the Act focuses heavily on energy, potentially neglecting water consumption and material toxicity (e-waste) in its binding requirements [cite: 48, 52].

### Measurement Frameworks and ISO Standards

Standardization bodies are developing the metrics required for compliance.

*   **ISO/IEC 42001:** This is the flagship management system standard for AI, which includes considerations for responsible use and sustainability [cite: 53].
*   **ISO/IEC TR 20226:** A specific technical report on the "Environmental sustainability aspects of AI systems," covering energy, water, and e-waste [cite: 54, 55].
*   **Software Tools:**
    *   **CodeCarbon & Green Algorithms:** These open-source tools allow developers to estimate emissions by tracking hardware usage and grid carbon intensity. However, 2025 research suggests they may underestimate true energy use by 20-30% because they often miss overheads (cooling, PSU efficiency) [cite: 3, 56].
    *   **Compute Carbon Intensity (CCI):** A new metric proposed to quantify the carbon cost per unit of computational performance, aiding in hardware comparison [cite: 11].

---

## Summary of Findings

1.  **Inference Dominance:** The environmental impact of AI has shifted from a training-centric view to an inference-centric one. As models like Gemini and GPT-4 are integrated into daily search and productivity tools, the aggregate energy and water cost of billions of queries dwarfs the training cost.
2.  **Water is the New Carbon:** Water consumption is the critical emerging metric. While per-query usage has improved (down to fractions of a milliliter for efficient models), the explosive scale of demand threatens local water security, necessitating a shift to "water-positive" data center designs.
3.  **Efficiency over Size:** The "Red AI" era of exponentially larger models is being challenged by "Green AI" techniques. Quantization, neuromorphic hardware, and specialized Small Language Models (SLMs) offer a path to decouple AI capabilities from massive resource consumption.
4.  **Regulation is Here:** The EU AI Act has moved sustainability reporting from "nice-to-have" to "license-to-operate" for major AI providers. This is driving a standardization of metrics (ISO/IEC) that will likely become the global baseline.
5.  **AI as a Savior and a Sinner:** AI's ability to optimize renewable grids and forecast climate disasters is proven and valuable. However, without mitigating its own footprint, the technology risks consuming the very resources it aims to save.

## Key Papers & Methods

*   **Google Environmental Report 2025:** Disclosed specific per-query metrics for Gemini (0.24 Wh, 0.26 mL water), setting a new transparency benchmark [cite: 4, 5].
*   **Li et al. (2025 Update) - "Making AI Less 'Thirsty'":** The foundational paper bringing AI water consumption into the spotlight, estimating global AI water withdrawal could rival the usage of entire nations [cite: 6, 57].
*   **GraphCast (Lam et al., Science 2023):** Demonstrated that GNNs can outperform traditional physics-based weather models while being far more energy-efficient [cite: 19].
*   **FourCastNet v3 (2025):** Advanced geometric ML for weather forecasting, enabling large-scale ensemble predictions on limited hardware [cite: 21].
*   **"Small is Sufficient" (2025):** Quantified that adopting smaller, task-specific models could save ~28% of global AI electricity [cite: 34].
*   **Neuromorphic Review (2025):** Comprehensive survey of event-driven architectures (Loihi 2, Akida) proving 100x efficiency gains for specific workloads [cite: 36, 37].

## Future Directions

*   **Standardized Water Reporting:** Unlike carbon, water reporting lacks a unified standard (e.g., Water Usage Effectiveness vs. total withdrawal). Future research must harmonize these metrics to prevent "water washing."
*   **Hardware-Software Co-Design:** The next leap in efficiency will likely come from designing algorithms specifically for neuromorphic and non-von Neumann hardware, rather than adapting current neural networks to them.
*   **Scope 3 Clarity:** Better data is needed on the "embodied carbon" of AI hardware. The 2025 LCA of TPUs is a start, but industry-wide transparency on chip manufacturing emissions is required.
*   **Jevons Paradox Mitigation:** As AI becomes more efficient, it becomes cheaper to use, potentially increasing total consumption. Research into policy mechanisms to cap absolute emissions despite efficiency gains is vital.

## Actionable Insights

1.  **For Developers:**
    *   **Adopt "Green AI" Tools:** Integrate **CodeCarbon** or **Eco2AI** into CI/CD pipelines to track emissions during development.
    *   **Optimize Inference:** Use **Quantization** (e.g., 4-bit) and **Distillation** to deploy smaller models. Default to Small Language Models (SLMs) for specific tasks rather than calling giant GP-LLMs for everything.
    *   **Carbon-Aware Computing:** Schedule training runs for times of day when the grid is cleanest (using APIs like Electricity Maps).

2.  **For Organizations:**
    *   **Procurement Requirements:** Demand **Life Cycle Assessments (LCA)** from hardware vendors to understand embodied carbon.
    *   **Water Stewardship:** Prioritize data center providers that use **water-free cooling** or recycled water, especially in water-stressed regions.
    *   **Compliance Preparation:** Align reporting frameworks with **ISO/IEC 42001** and the **EU AI Act** Article 40 requirements immediately to avoid regulatory friction.
    *   **Lifecycle Management:** Implement strict e-waste policies, ensuring retired AI hardware is refurbished or recycled through certified circular economy partners (e.g., Mol-e).

**Sources:**
1. [arxiv.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGFeuZld44rKJ8kIag_qEqvLxl-166OmPJM3R8fo0P2JyOba8BB6BRg4HWSIUcVNKp4hyPCtAmI5q_6DX0x-n4ByWmeyno8PuQtQ8XOdKEKiGnaOrvJ18G1yA==)
2. [medium.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHBXnScP9Bvw8nUG6Jj-ctLgZKo0DkxoUtCmLwrpU8XVl0_h8b2WopfQdwXPPlT0Wo5FHoIBy0mExsp0tCNR9ukmoKwOeKIQRTfIUkb7e7B_2xgbSWHU8D8hZ4TgADcJLftUzspnOMcwRdExoUSe7SlEz6Mw3zazqNE9YzqaA_Ik3BdTK3z7xeqmAyihZXL1KbsPNcWWiaHKLcb06lmbRBqenO-rJCLTdG27hN6r6I=)
3. [theamericanjournals.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGNisfLIUm3AMzCtf0u9rEpZJ0Zm0q49SM0jYsm6lAYjmzJkbpjkf7Lq5FbLowEJqLJWvcuE-t3JqVq5SSxMcAfD1PZbKm2RoNApUFEv3N-6g0Ij3447apsJOUGvU746-VE4hvUMoDu8WGzgr71z1QDaKVd-kew5knfBjNvcLLfgiK3B7u2fxXMHQ==)
4. [carboncredits.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEtuYmP0GQWO4Hb2Hf3z8ejT6DAv4OeaiaQA1fNi87ddWsns6C1-rCu4vZUyYg_DHkC8ObU8woi-KgPfBJdqk1d8gwGazAE__TsT0Si2lW6NmqkfLodCVKEkXbTyRhsc4dsQoCf-6U7LXTDWiOw2Bwk6oyJf6DMyaLFo3cO-EqLWX4SuWnjg1lmwA==)
5. [google.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHlHEgjLU1qGIjYrCeg3wRriPOauSp7qxFh4LRCFu19H5EcpvOrnsKIShrVk4qEhEIb5846pnOH8ru0eojR9zZBELKEPKMqkcaHWsd1Cx42tntOlUnDrCwQn5OC0QXU-lkFqpjVfJbVBmcwzgNVdFz49qCNHj5dkuXcKst7p2r3w3Iv_4nrwn8G4G5IoTP5Cy18gzTYJO8EqMP0Hqrnu9I=)
6. [arxiv.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEnwMRyudHshooFN9yZAAAjf6n7FWo7UtrlpiCP_TbKvbuwLGhvn2vUUvFdF1B8iBxtcoxxP_LFVeDNq2-bsQ5LBRjY-CL4uWYePfBjFg5FNPBygyImkQ==)
7. [generative-ai-newsroom.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFPvgH97bGdxctb8heiIiiZtmDD-0saQ_ROhAYU0YKRMXgfrc5zkkb7umvquu9GqZh1djfHvPQhJOY4ELMsN8frh1E5ZIKenC90krzeOoTqMtYO8bXLG81NGvgTLMltGnCEVTqQCjhQ6cy8uPsg7GCJe-F5MFbLoL7l9FI5p4GlSXLZN9lv7JGccQobm9PV-pp5_Ch5k4Aj)
8. [avidclan.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEz6q1ELi4F1X2tRqKOqZGapPSYlU642llK_Owx30q1VrKW4dr_fwtUlIRS8CAOCXK1_ARhid6fBz_oFcxuYQjIBMN_bh3hQ326VARpgKF3eXhEiO1r3WehJCc3_LbnxQ_BZkSQUn__0PMpcox_omkn_6cRog==)
9. [boell.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0DzmLZhQELTP0Eiq3NNRWrDr_ldefK9I0awdT1JeVD8Tu0hYGQjqvBe589xrUpsbn3w44Mj6GA7MFGcwQgoOHvsgU-7ay7ueYNxf2_pHOVHL_hthQKah7pM6NoUxxRjd974zsdxCFA0BbRg==)
10. [lincolninst.edu](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGaPir8KM9q-8t8_iOTnbAqrxoqecYBeOxOLU7zfauionfatN8LKURYNTpcbsTxtXIpbbctbGzAh4dbnDKOxAXdXDZS6yfxQPU81D16llWZYU3jUJGy55sPoOMAbTAMXJP9KQ3yxaCnWtF_Zf5SoyYx_gRZOUZdsO96nYIzw4NMcrYYnuqJ_UERMImW-lmo_u1B7mtsl4lAJWMb6h0=)
11. [arxiv.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH6biHZzDvV6xG7MAKLjG2v8GqetNztIgqIxFIvM7_s0t0teB2w0_--XbcY2TTfLhbBLXPjZbEkEpPEY76zGU0SKrsoHOKBl_Q6wvpJ0ycDIihL-5rH94Y9dg==)
12. [researchgate.net](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFUuhvtght_HxG3IHajg1Fv8gLOp7KoLuryK6ce_KVEcp_dPkOJZdZL9U_3rYml15pEHvoz-Yaklm4vvZ_QUgJ9AI6snSbizIxFkvZSTxKuP5vAEmTxZHCBKUlgxL0WMEsbdGmGQK0nzPvahJcsJiDH99liT8MQHE42QPTxS3rKALZrmBhOZEIoYYifpKKgJpyuoVX5MfZGJteQmtqaCIKRTxDPfM8Y7h4KySZ4PL7Rhw1mRS1OFNNM6tpwITxGuFc=)
13. [aienergycalculator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHS3V_Xf_SKT-RKr9IZ51Su0d9tFfU72YLZIMD4jfTnEcZ51Qg5d2eNd1OFI6ymxBoCONoRAn9SFWcLGUVHvMGY--GCogqOcoaPkxCnfOEVGoJfXOPrmKeV6E8kCxCpnS3SsDnt_PqyUVXrTFEAVgFq17B1Tt1ZYhyONYsHh44galfrag_T)
14. [interactdc.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH8qzXWMUC2_BdW8bYpRu3YwQLd61v-51dKrwI0kEtbfgy4P40UxDqCYIKt_7oBlyFMopfcDahiJFDVOswni-m8Kxpx5sz27vfYqvbSVoD7r0Iak58yxYpmI7jpE11eqsRIk7Yb_V1qWQmexAg6-UJCKdeIRCa5ebu7-5CLh0c6Sc99Mccm2TZsZ2X8QRU=)
15. [torresmarketinginc.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEW79yqs3z5hvAvNf2XiASiB3CXYD8xKU_IG521GRM8AjOV-Pt_9FKFv559XGkV8PC2l-P8JHU9xjmo7fc1VcnYk40YUYCR5_TMtDo-yafLPNFTkzjByH0PDeu89TgS0aKdiha-yhP02u4R6JlmWa_1MebWl_NJN7R4T_rXINoQew==)
16. [sustainability-directory.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH6DpH2CCv1Q5wxuCAjI3RjMzLnabk3fFErYZ_It7rxPKDG0jHrhFDjYVATXMYVAfckfP3BDz24CUSeM67uJaot74sahUq-ObU2nVBhOcHa3f1BmkIyldF64urKBoI8BhFgI6dMj6_ZwTUQoTHjjeyFLEVmmC3WQyEJ1rzVQB3RnuiS_gZpzVRJqndAiOOb)
17. [researchgate.net](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH65XMo4JC3JqPYIzGq4_wSxiTLRE42TqPKk2rviojAtgd1w4UWCHPbJPGU2oE2AUubq2w9ExdRJBtCs3f_GD8usaT2Uq6cSQK2QCrAlG0jYaTZscSQsjjecRJXumLo4mmZ3EiJ7kW4ThuOpwJULXIKfzSjo5plJ7dVMhSlJJqBx7g2MbePsYHOixVEBPdh544tcgZu_-4ZARQ0NdmJPP-9tmswfyJb9Qiop0WeEVhzpWxU-J0qMpphZ0NyEYZTLvvYFsA4DE5EduCo--Biq7T86f9xl6gVoScse9NODxeGK4A9GhKTX35cQMIigAD9T6jjgo8N-g==)
18. [marmelab.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHip8TKrlq--WqAyLniC-yF0z5TBPh_w9peBorACCQ5H3XPn6viTMjUSHrfIGhu-tSR-ZvZaDDwq-NzidqWK5lfOqQDxNsAsehji-KvbITjtoajI8Z6NlNB_pnM20ZkagTIThXBOyWjifAdbS7szKmz21_i)
19. [deepmind.google](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG4GqBECqZaTOMnQpP_NGQ9WjVSQzqvaDmwuAEWahvPa-HrW8ZD_VqyzmMTYdeQPyKuS_9A4cRoJjReRAKLq1_1-KeM1d-KNJxc2YS_zDHjrdTEAhMWkNqrvaYITWDFjoN2e4w2UsidlguHhHprchHQ5-kKCY2N1sd1aEfeR9hDRWaziY5UQLl3X5DDA-bmZ7RxlH-BnzjknlkfJJmVJg==)
20. [arxiv.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGv4V1PzaSk3-sCLxgH4tmgzvDgl8Z1ePszA6AaOIH24DC2y23hrmccpzEKJgTMplj-ngluRZYpResiB3-0EmLoxa8_jduNARdMnAgZ5uwW_jiV32kJf8uW5A==)
21. [nvidia.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGWllWHP_RsX9Zb7iXxV8hWbIH2gd5YULOGR8ITF6Szx-NgecqjDW8dqmhZR8_aPYXEU3Dx7WMZV8DHMY0XLlBxzxcxG3-6UOKBk0pkFmS6CzXw8ZgebPqavS7BllAa7iJJRcDxQtZ6wpCUDha2xQ-Y8z3-2WTT5-txm6EV47ak6-AVqohcdTy2oO_2iShVYOm_JCSLK2crr9fOe-r6wLZv-ZHfaFgDhv0LiyUwaQ==)
22. [arxiv.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGov4Zulk157k8U3NyjoU1DFbgB1O1aNf46OsWGe7FYlziLAdOt9OTNz_HWDeqnZe-nLQ9je2KkBqp21-DwggvCGPC9WVRYD58-Jiuw63Bt6f7kDjA-kCN-pQ==)
23. [ijetcsit.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHDwVknOasBZ_q80krYp6k_CGE-tdmhGoeLfXIlU5FpND9-sAhVAifD1pp6MswnvKxSn02EMKjK0DZMxjWHvOjBsYcVuRqOcGwFkpZQptoB5cQkXvOKXXlLkvR_QzHRDiPE1KQEV3gLZpNsbLl3wt37toG2Iw==)
24. [eai.eu](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHFbmMMi2J4F27ZBKGedobyP0t7KIPSMWr9K6DLE9PT39jMhtaiw5EIBFWkxtB6CQmkeLt7hqFhS_d8Z7-rm5Tq7h3vyYWEiPiV9k-QiWWFJoN5hxBNdG3Rrzj56gdARyqNFhkzCQ==)
25. [ieee.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGY1hxqvrkWBy6xvB_-8gXNshFmuSMQ1f7QpC2mMayKzwv_DJWv4Jvb4E2fO62LOvR9kwWZVKqTDCIo4XBY14MRZea06Xj7zj5BKFwszYLxDg4Ku84UBYoIOhRN7N-mWmBf7uJ6)
26. [preprints.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQrn5BuGvZNrgtD9Ipy6-Icza9CeVq83E5qftlta-EYkHOhZxwFm_4v3EaHkV_Sf9qBwWU6Vu4DKSAlSLXwKLkY-IHiAilaTVHJfU7XYwnmoG6vAK3n3Iyv_du6D1HxogULlv8ezU=)
27. [wjarr.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFPDkep9-7cf3HoIHIECmZYcN_aaMyCQka3hkYCrIp5LATE4PJH6QZalvUUSn_-Spuk9eSx48IJkgZVyCARsW_MJoYx7gzt-yM0a8sUAI1qIgZlgudPfD6p86Tj9RKYI2jYge1HCFWVQD1zkmuvF0Q=)
28. [horizonepublishing.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH7Rxtt4tinFHeJQoG-mgaULsPtAWQnhbm6RjmMJ6Z8uC_hJ8hLAHAl1dmL-UR28_MtUOu_YsniJW-l_F0dG7YMQbT8JkM5Xkn5zTotFiJWfjIec9gszHJnZmIKe5Qk1E9nELzSycHliNsEuvbWir94zi0gMw==)
29. [researchgate.net](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFLOUGxLrQFpGlCDb-2o6CvBx8sfqan-GOsMA39ac2FTDJKiLWPMd9I537mse_c4e8-5-0UBdGM7qldu7D2QoyLhtWTnOQOkF3G9YpAS7QiLjr1Kjw603EsZsnZDjKr4wHhlHgJJwTolFzGShh1bZ9mJaELOWvWPGyG7x6Bit-2CD3rHOSjHmHQo6wNCjJ7Brclbl-S2Wx7EzTNLMOMAZZHdmExkJt4AaOpnjlnsFjm3VK8t840wRq3Ole_mL5hv5rJuk-xflwdc9dAyKkntSMnqSTRQEbC6iFNJ9X5esxfSB0vjt-gHqDbDISqKIGQxaWVSWuhPZS-BAHQ)
30. [medium.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5VS0jIMNlSWAJP5yYLxNm4mGcvrxf-m6QLevqSyYWYpgWQ50UEVn8P2QYAUBCb35lUMmX8SD7Zy_rQGpLbSIzPKYwflDHzoMnbG3tJdkuBNzSQmZCKw9BAUuNfA-Dg5ipB_fV8V_WnN573R27vzZr)
31. [medium.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGsLjFATiUWG4cMB2juJKRMLZ0gHZdvDg002n7Qd0yq30u-qDv6Bmm2XQEcqu8BW7PFzr5b7AFPr8h7CJ-uFCrxyTr4yrj3qxI8WPefFvqWBvb0qzWyNFO1tujdq1jUjsHGZemmY6SJbU5ynsENZw6CUOg70SeUxhttcs9nqNmW3LgQoxOdcuD1y3cu48XBAyK0-2msd53RPG3RpKaYJds9WBjn7sPXVPC8uz2Z97RMb5w=)
32. [sustainability-directory.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH3VbvJhY2_U5_LdniMvABf1xFaPfc_zjBa8PVJLONq3LF-xdzNG2zg6kh-iYjL4CIHibPDkKG2Ysa__TQ04p5l9vj13KFwlen9GZ7zPFRT4iCbIGDH77sk9hxvuP3JMPQtuz-FAuUpSs56aGC_6oyeXIgxl4iEXepQHC0TmUIm3icB0ZZegj_lHN9bP2dHnEOsF2t2HWBGKjePDeZuyLzKTyxMEVtIzQQJXNmqJdS-xDdQHwPxSHwDX9YFhA==)
33. [ijsret.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGVYoZZvKs8hQP-jJoKk2pPAC3keb2CMyMLLzmCpzV_vDhLNOrx7pMONPJtgPjsWGKMvo2QDa_CsuK2mS2EFSRjSAdsDvCL0L1IJbo_hxOQIWFTOeZKzMbbyaNMcLMfOF_fac_l6TqA7m_A0B9pMuzyIgd8MSi3)
34. [aicerts.ai](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFSiDu1nOee-d1ZEtsYB_GqLpJe1mdcfzHALV41L65_GEbCxw4mR-7Co9Wsx8SAlFZTjpUOKKdlkVJccC2Yl811jie4Bv7Of1Wxq9k8Zde8OuYDNap4RH6PAuxfJYBSvIfizQxOosffhOXXSM01wLEkE_CrvyiOhYf2Vl6D1aueo7L4sw8XWG-u5m929DFr)
35. [tdk.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHzwPkle3pUIZ7tTTALFzVWVE7_DApRoHSMoLQPBnWiWI8WCgRC9_r4v7-nMlbZTWlbUZ31kMad5g8WgEnvO4KU9htaEWtRQTf-l8jeOaT48osKgiTzBmYNuzPwqlK-TG7Xrl63jWZvJgdCyQZHu08mCH9x82zT1ozFcwwi-1m7Pks=)
36. [medium.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGY_O9R78RsqxueRhiRUxbNeP9512fKteYhgREnDsDfM4Cyv2MW7yx80A6ZULAmzsJmeb08C9Yp60GqXjzEXps8ZuY9AeAvj5FBzSrwXnnAdcbvIrMfIL-JDv0bnKtWU-6tiiI3y1xF5InxUC1MLP4gV_UX0-mZMxmuyhYR72nrNSD0uRK8LE_ZbowRg_Ss3uJkb6pjFJIWDJhSQL8aYrROceeH9wC4JCNPX6O_0Yw=)
37. [humanunsupervised.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGHy3uWRgyg43QiLMHMXbSY1SwquIGTFWsMhmON0WiuL6zx_1SGVIVcFveVH1YBPYgu5QSkajjHQVq4VDjTHqrL_8lhKe6UlPYBgcenX4dsJhdf6CV2ORGEWmhmixrX3khi4_8Qx-wMYwPTqDGFogUN6s2UZeJp)
38. [elprocus.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGlkc99v9dPkn42f1boL_veLk1KI9LJhrKd3Y39QwzU4vVwzZBVZoK8flD7EwV-G7SlLt0eAVMb4i6XlntKWjR14n1O8PiaJrRsI9zJ9jdyTb77Ic_BhR6Rzc-JWvtAigTVIo78jVUw2CCN2E-vaw==)
39. [nae.edu](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEg1Blv70bH8u6D7SWQ6lQz858uJY5f-mDuSK0__oesUPlMSFU7t6nUTsbhpch7PO9Bs6oHq9_KUgXKzKnCI2LdULVWQkGYC318zyvJ2Mkp6rmwN1CiGg92RTi6RkIN1z57IqmduVj4yhT0wezeoNDQZRdI7T8WOqlb25CVNwRI5_8FGygGRhNS7Y-79nI=)
40. [smartclasses.co](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGGggLixwZVmkA-oTnk5Tvh9DnkXEJzvOVQqNVitk9tch0OMqN0Vb9pA2bJsULMjH3ex0rrmZYi_Ku6byYqeBTbOtYUFag1hJ0qIaXnyQaEh0P5oxIeLUQIs8K8vg1umYgne7FONjXaKUobDqeQ_8jB3daxeEVtGkKRR5f8G7s8QWWwgAmZJyDvOBJ9oi41lKZePv7jLQJrVQZIfg==)
41. [columbia.edu](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFjg6W25ms-kq04agf4j4tirg1ZdOa2SI4qvmIgjAyk6fD36f_i7zuTVjP8UWmgKzj_bQcymXXc4N-QH2PDpZ7FQx-8XGsb8Ru1iKSsXGlYHucX6Ob3hNs7ObYH-qLVvw-mfGRn3XDFODf9b9fcgIOpGmmKK9uOmQq7DMQ9smyIB63IpFieQkeVEVMQ0TL7IA7Cw0jn)
42. [forumforthefuture.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEC5WJXjzOHyVKUDsz-1df25cpFdDIKj_CcK9iZdDQg0GJ33bCuaaYnKCbQ6Bw0d-7dxMTctlW2gRYThjq7egodQ3ap8_U4YGRpW2nEidN5ADwoxUAKwk6woR3NRuL6d5i3FQfsP4TzaxvW8Q742FUcuiJNwmJaT5EzYz3xG2u7xpOCFegfu0h3oFTJYTuzyTX90Q==)
43. [aiinthechain.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHKS2u_OXoidYTrbEAD2vr6vLgppjs4KwVTsqmGBQvA7wVLTfCpjrpVyTuodOy81NWekrX_3DizFQtEoLHmc1P10SECX2ZeiY0okSl8auOKAXHpEqMMeBLD3glSV3jqCjYQ_BBl2zyWC1h5DMlh0DASOJwEcm1ed3kZd4NtBxLH8IIHrdOXABbkLYIwGKxo3CwP)
44. [arxiv.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG53H8s9Vts3XN-TPtwhKyaC5yTdmsbG8ewRrDT3lpTKFss6MahNg0iC3ksV3OzTkSagWtSmF75JabdXfCdigrReeDEqeTuMfrOhBfxY-lHYOgBzMPyH1dW2Q==)
45. [climateainordics.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE8sKC5HNHECAjQQqt0jlwhRQNYmdIpACd6DJ3yfzAe41W6SCpR0AKk7vV1MbslTO9kmrjKOdJwPjAeWXL68oIfZH93fRxpHDuA59yeW9ThgNNoSQMKLOsGhbnnzv_vdhX78IIyiH023LftDbnh-K2y0LRT-aj8WU2mGeCywbIYIW2Q_FjDg72_rjD49ldCnMWqxaX7t5i-lT5XzjkXVlWDck5h)
46. [visionrobotics.eu](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG7BqMTUmwFJB93gko8pthJzU89pFroGta7qQ5oO-kjN9OAMPShOhrBbnGyy2uGKmjs_RnI2ILTdEHaEm8up4LHdDLrcG8X1amG4oGTJuehXjaJuc-G0NkH-L21YjCH3bJHcPlOnCx4ZaYFH2evne9ZvR1q2VmOja-BhF-uEVNSMA85bSs7kq0IRik=)
47. [ultralytics.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFj6PdTgdFzUTHHpFj2_u_Kt9B42xr-nTK0a10yAmQm2rKWV-B5k5lu-0JR1UpbZFWN-pWcXlQPqoSok88ehjsED07RurI0xLl-Ks4C1tCBBdt6GXdvnSeaet5AgqJmMHAY0SzqX6bg1qucDu5xgX5uETJBo2W1tzSwSKKsCp0xXPNJU872a0IZ_0xf8ZHKX5U=)
48. [greensoftware.foundation](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEQn7PtU2LYNmqLOEHlA-QsxN08WBvI5mL2fMSEKuaBO1v51EoG8p4e_cPusNffD_llk_NjERixzTt36xxiCUiRxUccA29ywMcoOoIoWWT9VIP_fOmU_wye-Z_nTpagiZ5VDPvve5DtqnA7zqZJ2LaUF88G2nlZNvlecyP-76fpi7cQ9XBX7fwyKBD3EmVr2K6jYD4=)
49. [rgpd.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEg5izh7Fim0F_MY5wHLJZD73GPoAVLXYw3ym6S22hChdV19OkJhoAO9KcrL8L5mUG-c6z-23ua6QyPCkiOtMYgDXHPL6l14PyHtIBotAxwLGJcn6pqt15SzUM5FIbU8wE7VkIl4uKD5SReyb3AqE8faof6saahC3DA1-4rhNA_5xw-vhBzYBqWeCWyU5lBXY2VhpZjM_0opjjDeKVO7pdwXKVmeMA4sGUNKehBds8=)
50. [whitecase.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHfHFX7j-WVcC-GzEEuRxHl4eqD9X-XZ7ZY9mDU6yvVOKUn_SbGPKa8AcPZ5JBIPXuSF9FrLD612n_-o0aoeH2xa_wMNbD3fnaV7m-ZTszwaaELT93JmUL4knW781zhWRdobVA-hgvy5_YRyLNEnlsnq2iZhN54_yXXIQXDLBjpqNSfA9-P2w9o-8jbHQ==)
51. [artificialintelligenceact.eu](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGXDSPZhmGkKt-IoA_F3fRMEGh7sb9Ccvz_j_ZJSGx2XOlyas_s8AU6fK3Zz9IhaxgaN1pLQlkWH_M8iPdUlZTN2u3GR6kECD-l-d0tRuybJKSBE0aSxC_a4x220FcvvU8N8KdPI1zUViTE0qfs2f55wtdXYA==)
52. [boell.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFY9ARaYJE5g2msWf1QOmXXevPARrionmWwiOoHgUKqOZ2GsnBszCVMYHRv79lOoCFprfD5HTiRYnA2gREyhMSNPfwOaGZaR1ii212U32i6sgZstdGPmTinh08rr8IrWAUJMP7--YMsIj2MvWbpCi3oIK5YlNM=)
53. [nemko.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE_llMleqRpQv5Z0cUR08FdTUDG6sp9eEVIKFVWKMVE6kZUNPxUHvQ_otTWHomSHrMpqvmj08oovWblkRIBIUVRRPHcSCrdAtuhUiGkqDlQsRcWGfes8NpXZJsQ6x21T4VEsf4zZBYY)
54. [jtc1info.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG4qejmM0Nq-s8KkdxV3X-DypE0RmVfgWxri6obizsqhX6nu6p_KB3eRzPD9fBEmDYn2fIv_ng_TcAk4OlRThoezJuTTaidE3sdta2Fp1IES0v-i0ta_8sT6IsAaRwyNs90x9038xVZ0NONMtcmCEmOyHbz3HfbIyA5nvjiXRhcB9bRqDAi4D_K0lQ=)
55. [youtube.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEjmKbBfoDZLHhHy-GTwBCd57M-QM315cfC7WTtvRsMLMvz6d6UN3b-drfjuG_XGUySmxqJYcY6bAH34npMccdDQyL0K0say5le5g2EQaYKY31j53hGVESockm6K_V7Cmqt)
56. [dev.to](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH22PZzwcdojW9Sf6aLWanP61z4BPVeyVsy5AcRbBu93_uMfQpiNR7wHPIMieplizmEQZZSXoujGTdsr-2x4XWqU_dGDMtuhq1_-ThNqs5PrgDv755TqlTbAguDrZOfewbP-TBAkHDoFkubMqy05knKhndZYzX5P5SzdXHVi4xyKtyWo1kAXbbxDIs02fIo5jYfcVCJH2X9U-_jZhGukDQI8muNayxy)
57. [deeprogram.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGDIiy70FjrbILQzaH-b7-87Sc9z46BxjFYSo-pxcWMLBXDWyAmY3gwS0UV6L5xexwI3LZd0nItRDNklWNCVjES6cYSdga67v-gmHy3FbXuBPfhrEsbHtcWcpAxE_Z89_U11ngwOYmoqtp_LvucBRJZ8b1Ak6C57pir6_F-y3VowVhMnmHUFxZGq7vK8acG6TGtUN-S0VO_4fQPClY8xIpBqvdhK0KxARz7fKxzLlyHfnPn85jAo4RVAPJYYd_X)
