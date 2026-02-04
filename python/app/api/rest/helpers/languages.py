import pycountry

def code_to_name(code: str) -> str:
  try:
    lang = pycountry.languages.get(alpha_2=code)
    if lang is None:
      lang = pycountry.languages.get(alpha_3=code)
    return lang.name if lang else None
  except:
    return None