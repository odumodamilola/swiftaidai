export const firstAidGuides = [
    {
      id: "1",
      categoryId: "1",
      title: "CPR (Cardiopulmonary Resuscitation)",
      subtitle: "Learn how to perform CPR correctly to help someone in cardiac arrest",
      warning: "CPR should only be performed if a person is unresponsive and not breathing normally. Call emergency services immediately.",
      imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1000&auto=format&fit=crop",
      steps: [
        {
          title: "Check responsiveness",
          description: "Tap the person's shoulder and shout to see if they respond. If no response, call emergency services (911) immediately."
        },
        {
          title: "Position the person",
          description: "Place the person on their back on a firm, flat surface."
        },
        {
          title: "Open the airway",
          description: "Tilt the head back slightly and lift the chin to open the airway."
        },
        {
          title: "Check for breathing",
          description: "Look, listen, and feel for breathing for no more than 10 seconds. If not breathing normally, begin CPR."
        },
        {
          title: "Begin chest compressions",
          description: "Place the heel of one hand on the center of the chest, place your other hand on top, and compress the chest at least 2 inches deep at a rate of 100-120 compressions per minute."
        },
        {
          title: "Give rescue breaths (if trained)",
          description: "After 30 compressions, give 2 rescue breaths if trained. If not trained in rescue breaths, continue chest compressions."
        },
        {
          title: "Continue CPR",
          description: "Continue cycles of 30 compressions and 2 breaths until emergency services arrive or the person shows signs of life."
        }
      ],
      doNot: [
        "Don't delay calling emergency services",
        "Don't perform CPR if the person is responsive or breathing normally",
        "Don't perform CPR on a soft surface if possible",
        "Don't lean on the chest between compressions",
        "Don't interrupt compressions for more than 10 seconds"
      ],
      additionalInfo: "If an AED (Automated External Defibrillator) is available, use it as soon as possible. Follow the voice prompts and continue CPR when instructed."
    },
    {
      id: "2",
      categoryId: "2",
      title: "Controlling Severe Bleeding",
      subtitle: "Learn how to stop severe bleeding in emergency situations",
      warning: "Severe bleeding can be life-threatening. Call emergency services immediately while providing first aid.",
      imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000&auto=format&fit=crop",
      steps: [
        {
          title: "Ensure safety",
          description: "Make sure the scene is safe for you and the injured person. Wear gloves if available to protect yourself from bloodborne pathogens."
        },
        {
          title: "Apply direct pressure",
          description: "Use a clean cloth, gauze pad, or even your hand (if no other option) to apply firm, direct pressure to the wound."
        },
        {
          title: "Maintain pressure",
          description: "Continue to apply firm pressure for at least 15 minutes. Do not remove the cloth if it becomes soaked with blood; add more material on top."
        },
        {
          title: "Elevate the wound",
          description: "If possible, elevate the wounded area above the level of the heart to help slow bleeding."
        },
        {
          title: "Apply a pressure bandage",
          description: "Once bleeding slows, apply a pressure bandage by wrapping the wound firmly with a bandage or clean cloth."
        },
        {
          title: "Monitor for shock",
          description: "Watch for signs of shock: pale skin, rapid breathing, weakness, confusion. Have the person lie down with legs elevated if shock is suspected."
        }
      ],
      doNot: [
        "Don't remove objects embedded in a wound",
        "Don't apply a tourniquet unless you're trained and bleeding is life-threatening",
        "Don't probe or clean a deep wound",
        "Don't remove the first dressing if it becomes soaked with blood",
        "Don't give the injured person food or drink"
      ],
      additionalInfo: "If bleeding doesn't stop with direct pressure, and you're trained to do so, a tourniquet may be necessary for limb injuries. Apply it 2-3 inches above the wound, not on a joint, and note the time of application."
    },
    {
      id: "3",
      categoryId: "3",
      title: "Treating Burns",
      subtitle: "Learn how to provide first aid for different types of burns",
      warning: "Severe burns require immediate medical attention. Call emergency services for serious burns, especially those covering large areas or on the face, hands, feet, genitals, or major joints.",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
      steps: [
        {
          title: "Stop the burning process",
          description: "Remove the person from the source of the burn. For thermal burns, cool the area with cool (not cold) running water for 10-15 minutes."
        },
        {
          title: "Remove restrictive items",
          description: "Remove jewelry, belts, and tight clothing from the burned area before swelling begins."
        },
        {
          title: "Cover the burn",
          description: "Cover the burn with a sterile, non-stick bandage or clean cloth. Wrap loosely to avoid putting pressure on the burned skin."
        },
        {
          title: "Manage pain",
          description: "Take over-the-counter pain relievers like ibuprofen or acetaminophen if needed for pain relief."
        },
        {
          title: "Protect the burn",
          description: "Keep the burn clean and covered to prevent infection. Change the dressing daily."
        }
      ],
      doNot: [
        "Don't use ice, as it can damage tissue",
        "Don't apply butter, oil, toothpaste, or other home remedies",
        "Don't break blisters",
        "Don't remove clothing stuck to burned skin",
        "Don't use cotton balls or fluffy materials that can stick to the burn"
      ],
      additionalInfo: "For chemical burns, rinse with running water for 20 minutes. For electrical burns, ensure the person is no longer in contact with the electrical source before providing aid, and always seek medical attention as internal damage may not be visible."
    },
    {
      id: "4",
      categoryId: "4",
      title: "Choking Emergency",
      subtitle: "Learn how to help someone who is choking",
      warning: "If the person can speak, cough forcefully, or breathe, do not interfere. If they cannot speak, cough, or breathe, act quickly.",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop",
      steps: [
        {
          title: "Recognize choking",
          description: "Signs include inability to talk, difficulty breathing, noisy breathing or wheezing, clutching the throat, cyanosis (bluish color of skin), and panic."
        },
        {
          title: "Give 5 back blows",
          description: "Stand behind the person and slightly to one side. Support their chest with one hand and lean them forward. Give 5 sharp blows between the shoulder blades with the heel of your hand."
        },
        {
          title: "Perform 5 abdominal thrusts (Heimlich maneuver)",
          description: "Stand behind the person with your arms around their waist. Place your fist, thumb side in, just above their navel. Grasp your fist with your other hand and pull inward and upward with quick, forceful thrusts."
        },
        {
          title: "Alternate between back blows and abdominal thrusts",
          description: "Continue alternating between 5 back blows and 5 abdominal thrusts until the object is forced out, the person can breathe or cough forcefully, or the person becomes unconscious."
        },
        {
          title: "If the person becomes unconscious",
          description: "Lower them to the ground, call emergency services, and begin CPR if you're trained. Before giving breaths, look in the mouth for the object and remove it if visible."
        }
      ],
      doNot: [
        "Don't interfere if the person is coughing forcefully",
        "Don't perform abdominal thrusts on pregnant women or obese individuals (use chest thrusts instead)",
        "Don't slap a choking person on the back while they're upright (this can cause the object to lodge further)",
        "Don't put your fingers in the person's mouth unless they're unconscious and you can clearly see the object",
        "Don't give anything to drink"
      ],
      additionalInfo: "For children under 1 year, use a combination of 5 back blows and 5 chest thrusts instead of abdominal thrusts. Hold the infant face down along your forearm with their head lower than their chest and give back blows, then turn them face up and give chest thrusts."
    },
    {
      id: "5",
      categoryId: "5",
      title: "Fracture First Aid",
      subtitle: "Learn how to provide first aid for suspected fractures",
      warning: "Do not move a person with a suspected spinal injury unless they are in immediate danger. Call emergency services immediately.",
      imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
      steps: [
        {
          title: "Stop any bleeding",
          description: "If there is bleeding, apply pressure to the wound with a clean cloth or bandage."
        },
        {
          title: "Immobilize the injured area",
          description: "Do not try to realign the bone. Stabilize the area in the position you found it using a splint and padding. For a splint, use rigid material (board, rolled magazine) and secure it with bandages or cloth."
        },
        {
          title: "Apply ice packs",
          description: "To reduce pain and swelling, apply ice packs wrapped in a towel. Do not apply ice directly to the skin. Apply for 20 minutes at a time."
        },
        {
          title: "Elevate the injured area",
          description: "If possible, elevate the injured area above the level of the heart to reduce swelling."
        },
        {
          title: "Treat for shock",
          description: "Have the person lie down, if possible, and keep them warm with a blanket. Raise their legs if there are no leg injuries and you don't suspect spinal injury."
        }
      ],
      doNot: [
        "Don't move the person unless absolutely necessary",
        "Don't attempt to straighten a broken bone",
        "Don't move joints or bones where a fracture is suspected",
        "Don't allow the injured person to eat or drink, in case surgery is needed",
        "Don't remove shoes or clothing unless checking for additional injuries"
      ],
      additionalInfo: "Signs of a fracture include pain, swelling, bruising, deformity, inability to use the affected body part, and in some cases, a grating sensation when the broken ends of bone rub together. Always seek medical attention for suspected fractures."
    },
    {
      id: "6",
      categoryId: "6",
      title: "Allergic Reactions",
      subtitle: "Learn how to recognize and respond to severe allergic reactions",
      warning: "Severe allergic reactions (anaphylaxis) can be life-threatening. Call emergency services immediately if you suspect anaphylaxis.",
      imageUrl: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000&auto=format&fit=crop",
      steps: [
        {
          title: "Identify anaphylaxis",
          description: "Look for signs such as difficulty breathing, swelling of the face/throat/tongue, hives or rash, rapid heartbeat, dizziness, nausea, or vomiting."
        },
        {
          title: "Call emergency services",
          description: "If the person shows signs of a severe reaction, call 911 immediately."
        },
        {
          title: "Use epinephrine auto-injector if available",
          description: "If the person has an epinephrine auto-injector (EpiPen, Auvi-Q), help them use it or administer it yourself if you're trained. Follow the instructions on the device."
        },
        {
          title: "Help the person stay calm",
          description: "Have them lie still on their back with legs elevated, unless they're having trouble breathing (in which case, help them sit up)."
        },
        {
          title: "Give additional medications if prescribed",
          description: "If the person has antihistamines or asthma inhalers prescribed for allergic reactions, help them take these after using epinephrine."
        },
        {
          title: "Monitor the person",
          description: "Stay with them and monitor their breathing and consciousness. Be prepared to perform CPR if they stop breathing."
        }
      ],
      doNot: [
        "Don't wait to see if symptoms improve before calling emergency services",
        "Don't have the person stand or walk",
        "Don't give oral medications if the person is having difficulty breathing",
        "Don't assume one dose of epinephrine will be sufficient",
        "Don't delay transport to emergency care even if symptoms improve"
      ],
      additionalInfo: "Epinephrine auto-injectors should be injected into the middle of the outer thigh and can be administered through clothing if necessary. The effects of epinephrine are temporary (usually 10-20 minutes), so emergency medical care is still needed even if symptoms improve."
    },
    {
      id: "7",
      categoryId: "7",
      title: "Poisoning First Aid",
      subtitle: "Learn how to respond to different types of poisoning",
      warning: "Call Poison Control (1-800-222-1222) or emergency services immediately in case of poisoning. Do not induce vomiting unless specifically instructed by a medical professional.",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop",
      steps: [
        {
          title: "Ensure safety",
          description: "Remove the person from danger if the poisoning is due to gases, fumes, or other environmental toxins. Ensure your own safety first."
        },
        {
          title: "Identify the poison if possible",
          description: "Try to determine what substance was ingested, inhaled, or contacted. Keep the container, plant, or other evidence to show medical personnel."
        },
        {
          title: "Call for help",
          description: "Contact Poison Control at 1-800-222-1222 or call emergency services (911). Follow their instructions exactly."
        },
        {
          title: "For ingested poisons",
          description: "Do not induce vomiting or give anything to drink unless directed by Poison Control or emergency services."
        },
        {
          title: "For poison on the skin",
          description: "Remove contaminated clothing using gloves. Rinse skin with running water for 15-20 minutes."
        },
        {
          title: "For poison in the eye",
          description: "Flush the eye with lukewarm water for 15-20 minutes. Remove contact lenses first if present."
        },
        {
          title: "For inhaled poisons",
          description: "Get the person to fresh air immediately. Open doors and windows for ventilation if safe to do so."
        }
      ],
      doNot: [
        "Don't induce vomiting unless specifically instructed by a medical professional",
        "Don't give the person anything to drink unless instructed",
        "Don't use syrup of ipecac (it's no longer recommended)",
        "Don't try to neutralize a poison with lemon juice, vinegar, or other substances",
        "Don't wait for symptoms to develop before seeking help"
      ],
      additionalInfo: "Common household poisons include cleaning products, medications, pesticides, and certain plants. Keep the Poison Control number (1-800-222-1222) programmed in your phone and posted in your home."
    },
    {
      id: "8",
      categoryId: "8",
      title: "Bites and Stings First Aid",
      subtitle: "Learn how to treat animal bites, insect stings, and snake bites",
      warning: "Seek immediate medical attention for bites from venomous animals, deep or large wounds, signs of infection, or allergic reactions.",
      imageUrl: "https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?q=80&w=1000&auto=format&fit=crop",
      steps: [
        {
          title: "Ensure safety",
          description: "Move away from the animal or insect to prevent additional bites or stings."
        },
        {
          title: "For minor wounds",
          description: "Wash the wound thoroughly with soap and water. Apply an antiseptic and cover with a clean bandage."
        },
        {
          title: "For insect stings",
          description: "Remove the stinger if present by scraping it off with a flat-edged object (not tweezers). Clean the area and apply a cold pack to reduce swelling."
        },
        {
          title: "For snake bites",
          description: "Keep the bitten area below heart level. Remove jewelry or tight clothing near the bite. Clean the wound, but don't flush with water. Mark the edge of swelling on the skin and note the time."
        },
        {
          title: "For animal bites",
          description: "Control bleeding by applying pressure with a clean cloth. Clean the wound thoroughly and cover with a sterile bandage."
        },
        {
          title: "Monitor for signs of infection",
          description: "Watch for increased pain, swelling, redness, warmth, or discharge from the wound in the days following."
        }
      ],
      doNot: [
        "Don't try to capture or kill the animal for identification (unless it can be done safely)",
        "Don't apply a tourniquet for snake bites",
        "Don't cut the wound or attempt to suck out venom",
        "Don't apply ice directly to a snake bite",
        "Don't give the person alcohol or medications that might thin the blood"
      ],
      additionalInfo: "For tick bites, remove the tick by grasping it close to the skin with tweezers and pulling straight out. Clean the area and save the tick for identification if possible. Watch for signs of tick-borne illness such as rash, fever, or joint pain in the weeks following."
    }
  ];